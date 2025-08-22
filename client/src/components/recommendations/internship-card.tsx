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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300" data-testid={`internship-card-${internship.id}`}>
      <div className="flex items-center mb-3 sm:mb-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${getIconColor(internship.field)} rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0`}>
          <Building className="text-white" size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{internship.company}</h4>
          <p className="text-xs sm:text-sm text-gray-600 truncate">{internship.location}</p>
        </div>
      </div>
      <h5 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{internship.title}</h5>
      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">{internship.description}</p>
      <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <Calendar className="mr-2 flex-shrink-0" size={14} />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <DollarSign className="mr-2 flex-shrink-0" size={14} />
          <span>{internship.stipend}</span>
        </div>
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <Clock className="mr-2 flex-shrink-0" size={14} />
          <span>{internship.schedule}</span>
        </div>
      </div>
      <Button className={`w-full text-white transition-colors text-sm sm:text-base ${getButtonColor(internship.field)}`}>
        Apply Now
      </Button>
    </div>
  );
}
