import { Plus, Trash2 } from "lucide-react";

type Project = {
  name?: string;
  type?: string;
  description?: string;
  link?:string
};

const ProjectForm = ({ data, onChange }: { data: Project[]; onChange: (data: Project[]) => void }) => {
  
  const addProject = () => {
    const newProject = {
     name:"",
      type:"",
      description:"",
      link:"",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index: number, field: string, value: string | boolean) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  
  return(
      <div >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
           Projects
          </h3>
          <p className="text-sm text-gray-500">Add Your Projects</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      
        
    
        <div className="space-y-4 mt-6">
          {data.map((project: Project, index: number) => (
            <div key={index} className="border rounded p-4 border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">
                   #{index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg"
                  placeholder="Project Name"
                />

                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg"
                  placeholder="Project Type"
                />
                  <input
                  type="url"
                  value={project.link || ""}
                  onChange={(e) => updateProject(index, "link", e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="border rounded px-3 py-2 w-full text-sm"
                  />
                
                <textarea 
                  rows ={20}
                  value={project.description || ""}
                  onChange={(e) => updateProject(index, "description" ,e.target.value)} 
                  placeholder="Project Description"
                  className="w-full px-3 py-2 text-sm rounded-lg resize-none"
                  />

              </div>

             
               
            </div>
          ))}
        </div>
     
    </div>
  );
};

export default ProjectForm;