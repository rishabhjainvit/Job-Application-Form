import { useContext, useState } from "react";
import InputText from "../../components/form/InputText";
import { v4 as uuidv4 } from 'uuid';
import { FormContext } from "../../context/FormContext";
import WorkExpDropDown from "../../components/commonComponents/WorkExpDropDown";

function WorkExperience() {
  const { formData: { workExperiences }, formErrorData, updateFormData } = useContext(FormContext);
  const workExperiencesError = formErrorData.workExperiences;

  function handleChange(event) {
    const { name, value, id } = event.target;
    const specificObjId = id.split("_")[1];

    const updatedWorkExperiences = workExperiences.map(workExperience => {
      if (workExperience.id === specificObjId) {
        return { ...workExperience, [name]: value };
      }
      return workExperience;
    });
    updateFormData({ workExperiences: updatedWorkExperiences });
  }

  function addAnotherExperience() {
    let newGeneratedId = uuidv4();
    let newWorkExperience = {
      id: newGeneratedId,
      companyName: "",
      designation: "",
      from: "",
      to: "",
      skills: []
    };
    updateFormData({ workExperiences: [...workExperiences, newWorkExperience] });
  }

  function deleteExperience(id) {
    if (workExperiences.length > 1) {
      let filterdWorkExperience = workExperiences.filter((workExperience) => {
        return workExperience.id !== id
      });
      updateFormData({ workExperiences: [...filterdWorkExperience] });
    }
  }

  return (
    <div>
      <div className="w-full flex justify-end">
        <button
          type="button"
          className="m-5 flex justify-end hover:text-blue-600"
          onClick={addAnotherExperience}
        >
          Add
        </button>
      </div>
      {workExperiences?.map((workExperience) => {
        return <WorkExperienceLine key={workExperience.id} {...workExperience} workExperiencesError={workExperiencesError} handleChange={handleChange} deleteExperience={deleteExperience} />;
      })}
    </div>
  );
}

export default WorkExperience;

function WorkExperienceLine({ id, companyName, designation, from, to, skills, workExperiencesError, handleChange, deleteExperience }) {
  const [isSkillSectionOpen, setIsSkillSectionOpen] = useState(false);

  const inputFields = [
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "designation", label: "Designation", type: "text" },
    { name: "from", label: "From", type: "date" },
    { name: "to", label: "To", type: "date" }
  ];

  return (
    <div className="flex flex-col border border-gray-300 p-3 m-3 rounded-lg">
      <div className="flex">
          {inputFields?.map((field) => (
            <div key={field.name} className="mx-5">
              <InputText
                type={field.type}
                name={field.name}
                id={`${field.name}_${id}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                label={field.label}
                value={field.name === "companyName" ? companyName : field.name === "designation" ? designation : field.name === "from" ? from : to}
                handleChange={handleChange}
                errorObj={workExperiencesError[`${field.name}_${id}`]}
              />
            </div>
          ))}
          <button className="hover:text-blue-600 h-fit m-auto" type="button" onClick={() => { deleteExperience(id) }}>
            delete
          </button>
          <svg onClick={() => {setIsSkillSectionOpen((prev) => !prev)}} data-accordion-icon className={`${isSkillSectionOpen && 'rotate-0'} w-3 h-3 rotate-180 shrink-0 hover:text-blue-600`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
          </svg>
      </div>
      {
        isSkillSectionOpen && (<WorkExpDropDown id={id} skills={skills} errorObj={workExperiencesError[`skills_${id}`]} />)
      }
    </div>
  );
}
