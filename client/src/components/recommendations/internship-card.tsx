import { Button } from "@/components/ui/button";
import { Internship } from "@/lib/types";
import { Calendar, DollarSign, Clock, Building } from "lucide-react";

interface InternshipCardProps {
  internship: Internship;
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  const getIconColor = (field: string) => {
    switch (field.toLowerCase()) {
      case 'technology': return 'from-blue-500 to-blue-600';
      case 'creative': return 'from-purple-500 to-purple-600';
      case 'business': return 'from-teal-500 to-teal-600';
      case 'science': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getButtonColor = (field: string) => {
    switch (field.toLowerCase()) {
      case 'technology': return 'bg-blue-600 hover:bg-blue-700';
      case 'creative': return 'bg-purple-600 hover:bg-purple-700';
      case 'business': return 'bg-teal-600 hover:bg-teal-700';
      case 'science': return 'bg-green-600 hover:bg-green-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300" data-testid={`internship-card-${internship.id}`}>
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${getIconColor(internship.field)} rounded-xl flex items-center justify-center mr-4`}>
          <Building className="text-white" size={20} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{internship.company}</h4>
          <p className="text-sm text-gray-600">{internship.location}</p>
        </div>
      </div>
      <h5 className="text-lg font-semibold text-gray-900 mb-2">{internship.title}</h5>
      <p className="text-gray-600 mb-4">{internship.description}</p>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="mr-2" size={16} />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="mr-2" size={16} />
          <span>{internship.stipend}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="mr-2" size={16} />
          <span>{internship.schedule}</span>
        </div>
      </div>
      <Button className={`w-full text-white transition-colors ${getButtonColor(internship.field)}`}>
        Apply Now
      </Button>
    </div>
  );
}
