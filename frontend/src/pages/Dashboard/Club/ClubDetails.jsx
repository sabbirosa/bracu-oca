import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from 'react-hook-form';
import { BiArrowBack } from "react-icons/bi";
import { MdEdit, MdEmail, MdPeople } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAllClubs from "../../../Hooks/useAllClubs";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const PersonCard = ({ person, type }) => {
  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-all duration-300 relative group">
      {/* Top Accent Line - Subtle indicator */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg
          ${type === 'advisor' ? 'bg-[#4c44b3]' : type === 'panel' ? 'bg-[#FB7D5B]' : 'bg-gray-200'}`}
      />
      
      <div className="flex flex-col items-center">
        {/* Image with hover effect */}
        <div className="relative mb-3 group-hover:-translate-y-1 transition-transform duration-300">
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img
              src={person.photo}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-[#303972]">{person.name}</h3>
          
          {/* Role Tag */}
          <div className="inline-flex items-center">
            <span className={`px-2 py-1 rounded-md text-xs font-medium 
              ${type === 'advisor' ? 'bg-[#4c44b3]/5 text-[#4c44b3]' : 
                type === 'panel' ? 'bg-[#FB7D5B]/5 text-[#FB7D5B]' : 
                'bg-gray-100 text-gray-600'}`}>
              {person.role}
            </span>
          </div>

          {/* Additional Info */}
          {person.email && (
            <div className="pt-1">
              <p className="text-gray-500 text-xs truncate">{person.email}</p>
            </div>
          )}
          {type === 'alumni' && person.currentPosition && (
            <div className="pt-1">
              <p className="text-gray-600 text-xs">{person.currentPosition}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ClubDetails = () => {
  const { id } = useParams();
  const [allClubs, allClubsRefetch] = useAllClubs();
  const navigate = useNavigate();
  const club = allClubs.find((c) => c._id === id);
  const [currUser] = useCurrentUser();

  const editAccess = club?.email === currUser?.email;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: club?.name || '',
      fullName: club?.fullName || '',
      description: club?.description || '',
      email: club?.email || '',
      photo_url: club?.photo_url || '',
      advisors: club?.advisors || [],
      panel: club?.panel || [],
      notableAlumnis: club?.notableAlumnis || [],
      totalMembers: club?.totalMembers || 0,
    },
  });

  const {
    fields: advisorFields,
    append: appendAdvisor,
    remove: removeAdvisor,
  } = useFieldArray({
    control,
    name: 'advisors',
  });

  const {
    fields: panelFields,
    append: appendPanel,
    remove: removePanel,
  } = useFieldArray({
    control,
    name: 'panel',
  });

  const {
    fields: alumniFields,
    append: appendAlumni,
    remove: removeAlumni,
  } = useFieldArray({
    control,
    name: 'notableAlumnis',
  });

  const onSubmit = async (data) => {
    try {

      await axios.patch(`${import.meta.env.VITE_API_URL}/clubs-update/${club._id}`, data);
      setIsModalOpen(false);
      allClubsRefetch();
      // Handle successful update
    } catch (error) {
      // Handle error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: {error},
      })
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(240,241,255)]">
      {/* Header */}
      {!editAccess && (
        <div className="navbar p-0 mt-[-20px] mb-4">
          <div className="flex-1">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-1 text-[#4c44b3] hover:text-[#FB7D5B] transition-colors"
            >
              <BiArrowBack className="text-lg" /> Back to Clubs
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Club Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            {/* Club Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-[#4c44b3] to-[#303972]" />
              <div className="px-4 pb-4 -mt-12">
                <div className="flex flex-col items-center">
                  <img
                    src={club?.photo_url}
                    alt={club?.name}
                    className="w-24 h-24 rounded-lg object-cover ring-4 ring-white mb-2"
                  />
                  <h1 className="text-xl font-bold text-[#303972] mb-1">{club?.name}</h1>
                  <h2 className="text-gray-600 text-sm mb-3">{club?.fullName}</h2>
                  <div className="flex items-center gap-1 text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                    <MdEmail className="h-4 w-4" />
                    <span className="text-sm">{club?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            {club?.totalMembers && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#4c44b3]/5 rounded-lg">
                    <MdPeople className="h-6 w-6 text-[#4c44b3]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Members</p>
                    <p className="text-2xl font-bold text-[#303972]">
                      {club?.totalMembers}
                    </p>
                  </div>
                </div>
              </div>
            )}


{editAccess && (
             <div className="bg-white rounded-xl shadow-sm p-6">
               <div className="flex items-center gap-4">
                 <div className="p-4 bg-[#FB7D5B]/5 rounded-xl">
                   <MdEdit className="h-4 w-4 text-[#FB7D5B]" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500">Change Information</p>
                   <p className="text-xl font-bold text-[#303972]">
                   <button onClick={() => setIsModalOpen(true)}>Edit</button>
                   </p>
                 </div>
               </div>
             </div>
           )}
          </div>
        </div>

        {/* Modal */}
        {/* Modal */}
       {isModalOpen && (
       <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
         <div className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[70vh] overflow-y-auto relative">
           <h2 className="text-2xl font-bold text-[#303972] ">Edit Club Information</h2>
           <p className="text-xs text-gray-500 mb-6">If you want an empty form, just refresh the page and open the form again.</p>
           <button className="absolute text-xl top-6 right-6 font-bold text-red-400" onClick={() => setIsModalOpen(false)}>x</button>
           <form onSubmit={handleSubmit(onSubmit)}>
            

             {/* Description */}
             <div className="mb-4">
               <label htmlFor="description" className="block mb-1">
                 Description
               </label>
               <textarea
                 id="description"
                 {...register('description', { required: 'Description is required' })}
                 className={`w-full px-4 py-2 border ${
                   errors.description ? 'border-red-500' : 'border-gray-300'
                 } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                 rows={4}
               />
               {errors.description && (
                 <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
               )}
             </div>



             {/* Photo URL */}
             <div className="mb-4">
               <label htmlFor="photo_url" className="block mb-1">
                 Photo URL
               </label>
               <input
                 type="text"
                 id="photo_url"
                 {...register('photo_url', { required: 'Photo URL is required' })}
                 className={`w-full px-4 py-2 border ${
                   errors.photo_url ? 'border-red-500' : 'border-gray-300'
                 } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
               />
               {errors.photo_url && (
                 <p className="text-red-500 text-sm mt-1">{errors.photo_url.message}</p>
               )}
             </div>


             {/* Total Members */}
             <div className="mb-4">
               <label htmlFor="totalMembers" className="block mb-1">
                 Total Members
               </label>
               <input
                 type="number"
                 id="totalMembers"
                 {...register('totalMembers', { min: 0 })}
                 className={`w-full px-4 py-2 border ${
                   errors.totalMembers ? 'border-red-500' : 'border-gray-300'
                 } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
               />
               {errors.totalMembers && (
                 <p className="text-red-500 text-sm mt-1">{errors.totalMembers.message}</p>
               )}
             </div>


             {/* Advisors */}
             <div className="mb-4">
               <label className="block mb-1">Advisors</label>
               {advisorFields.map((field, index) => (
                 <div key={field.id} className="flex items-center mb-2">
                   <input
                     type="text"
                     {...register(`advisors.${index}.name`, {
                       required: 'Advisor name is required',
                     })}
                     className={`w-full px-4 py-2 border ${
                       errors.advisors?.[index]?.name
                         ? 'border-red-500'
                         : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-white`}
                     placeholder="Name"
                   />
                   <input
                     type="text"
                     {...register(`advisors.${index}.photo`, {
                       required: 'Advisor photo is required',
                     })}
                     className={`w-full px-4 py-2 border ${
                       errors.advisors?.[index]?.photo
                         ? 'border-red-500'
                         : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-white`}
                     placeholder="Photo URL"
                   />
                   <input
                     type="text"
                     {...register(`advisors.${index}.role`, {
                       required: 'Advisor role is required',
                     })}
                     className={`w-full px-4 py-2 border ${
                       errors.advisors?.[index]?.role
                         ? 'border-red-500'
                         : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-white`}
                     placeholder="Role"
                   />
                   <button
                     type="button"
                     onClick={() => removeAdvisor(index)}
                     className="px-2 py-1 bg-red-500 text-white rounded-md"
                   >
                     Remove
                   </button>
                 </div>
               ))}
               <button
                 type="button"
                 onClick={() => appendAdvisor({ name: '', photo: '', role: '' })}
                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
               >
                 Add Advisor
               </button>
             </div>


             {/* Panel Members */}
             <div className="mb-4">
               <label className="block mb-1">Panel Members</label>
               {panelFields.map((field, index) => (
                 <div key={field.id} className="flex items-center mb-2">
                   <input
                     type="text"
                     {...register(`panel.${index}.name`, {
                       required: 'Panel member name is required',
                     })}
                     className={`w-full px-4 py-2 border ${
                       errors.panel?.[index]?.name
                         ? 'border-red-500'
                         : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-white`}
                     placeholder="Name"
                   />
                   <input
                     type="text"
                     {...register(`panel.${index}.photo`, {
                       required: 'Panel member photo is required',
                     })}
                     className={`w-full px-4 py-2 border ${
                       errors.panel?.[index]?.photo
                         ? 'border-red-500'
                         : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-white`}
                     placeholder="Photo URL"
                   />
                   <input
                     type="text"
                     {...register(`panel.${index}.role`, {
                       required: 'Panel member role is required',
                     })}
                     className={`w-full px-4 py-2 border ${
                       errors.panel?.[index]?.role
                         ? 'border-red-500'
                         : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-white`}
                     placeholder="Role"
                   />
                   <button
                     type="button"
                     onClick={() => removePanel(index)}
                     className="px-2 py-1 bg-red-500 text-white rounded-md"
                   >
                     Remove
                   </button>
                 </div>
               ))}
               <button
                 type="button"
                 onClick={() => appendPanel({ name: '', photo: '', role: '' })}
                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
               >
                 Add Panel Member
               </button>
             </div>


             {/* Notable Alumni */}
             <div className="mb-4">
               <label className="block mb-1">Notable Alumni</label>
               {alumniFields.map((field, index) => (
                 <div key={field.id} className="flex items-center mb-2">
                   <input
                     type="text"
                     {...register(`notableAlumnis.${index}.name`, {
                       required: 'Notable alumni name is required',
                     })}
                     className={`w-full px-4 py-2 border ${
                       errors.notableAlumnis?.[index]?.name
                         ? 'border-red-500'
                         : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-white`}
                     placeholder="Name"
                   />
                   <input
                     type="text"
                     {...register(`notableAlumnis.${index}.photo`, {
                       required: 'Notable alumni photo is required',
                     })}
                     className={`w-full px-4 py-2 border ${
                       errors.notableAlumnis?.[index]?.photo
                         ? 'border-red-500'
                         : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-white`}
                     placeholder="Photo URL"
                   />
                   <input
                     type="text"
                     {...register(`notableAlumnis.${index}.role`, {
                       required: 'Notable alumni role is required',
                     })}
                     className={`w-full px-4 py-2 border ${
                       errors.notableAlumnis?.[index]?.role
                         ? 'border-red-500'
                         : 'border-gray-300'
                     } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-white`}
                     placeholder="Role"
                   />
                   <button
                     type="button"
                     onClick={() => removeAlumni(index)}
                     className="px-2 py-1 bg-red-500 text-white rounded-md"
                   >
                     Remove
                   </button>
                 </div>
               ))}
               <button
                 type="button"
                 onClick={() => appendAlumni({ name: '', photo: '', role: '' })}
                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
               >
                 Add Notable Alumni
               </button>
             </div>


             {/* Save Changes Button */}
             <div className="mt-6">
               <button
                 type="submit"
                 className="px-6 py-2 bg-[#4c44b3] text-white rounded-md"
               >
                 Save Changes
               </button>
             </div>
           </form>
         </div>
       </div>
       )}





        {/* Right Column - Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Description */}
          {club?.description && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#303972] mb-3">About</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {club?.description}
                </p>
              </div>
            </div>
          )}

          {/* Advisors */}
          {club?.advisors?.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#303972] mb-4">Club Advisors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {club?.advisors?.map((advisor, index) => (
                  <PersonCard 
                    key={index} 
                    person={advisor} 
                    type="advisor"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Panel Members */}
          {club?.panel?.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#303972] mb-4">
                Executive Committee
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club?.panel?.map((member, index) => (
                  <PersonCard 
                    key={index} 
                    person={member} 
                    type="panel"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Notable Alumni */}
          {club?.notableAlumnis?.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#303972] mb-4">
                Notable Alumni
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club?.notableAlumnis?.map((alumni, index) => (
                  <PersonCard 
                    key={index} 
                    person={alumni} 
                    type="alumni"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;