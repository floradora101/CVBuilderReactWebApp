import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const SkillItem = ({ skill, onDelete }) => (
  <div className="row align-items-center mb-3">
    <div className="col">
      <p>{skill.name}</p>
      <p>Level: {skill.level}</p>
    </div>
    <div className="col-auto">
      <button className="btn btn-sm rounded-button" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  </div>
);

const Skills = ({ formData, updateFormData }) => {
  const [skills, setSkills] = useState(formData.skillData || []);

  useEffect(() => {
    updateFormData({ skillData: skills });
  }, [skills, updateFormData]);

  const proficiencyLevels = [
    "Novice",
    "Beginner",
    "Skillful",
    "Experienced",
    "Expert",
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      const newSkillObj = { name: newSkill, level: newSkillLevel };
      setSkills([...skills, newSkillObj]);
      setNewSkill("");
      setNewSkillLevel("Novice");
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Novice");

  return (
    <div>
      <h2 className="title">Skills</h2>

      {/* Add Skill Form */}
      <div className="mt-3 mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control rounded-start"
            placeholder="Enter Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <select
            className="form-select rounded-end"
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
          >
            {proficiencyLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleAddSkill}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Skill
          </button>
        </div>
      </div>

      {/* Selected Skills */}
      <div className="row mb-3 align-items-center">
        <div className="col">
          <div className="accordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button rounded-button"
                  type="button"
                >
                  Skills
                </button>
              </h2>

              <div className="accordion-body">
                {skills.map((skill, index) => (
                  <SkillItem
                    key={index}
                    skill={skill}
                    onDelete={() => handleDeleteSkill(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
