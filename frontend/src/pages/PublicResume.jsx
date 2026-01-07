import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import TemplateOne from "../components/templates/TemplateOne";

const PublicResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    API.get(`/resume/${id}`).then((res) => setResume(res.data));
  }, [id]);

  if (!resume) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white p-6 w-[210mm]">
        <TemplateOne resume={resume} />
      </div>
    </div>
  );
};

export default PublicResume;
