import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CareerPath } from "@/lib/types";
import { DollarSign, TrendingUp } from "lucide-react";

interface CareerCardProps {
  career: CareerPath;
}

export default function CareerCard({ career }: CareerCardProps) {
  const getGradientColor = (score: number) => {
    if (score >= 85) return "from-blue-500 to-purple-600";
    if (score >= 75) return "from-purple-500 to-pink-600";
    return "from-teal-500 to-green-600";
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-blue-600";
    if (score >= 75) return "text-purple-600";
    return "text-teal-600";
  };

  const getButtonColor = (score: number) => {
    if (score >= 85) return "bg-blue-600 hover:bg-blue-700";
    if (score >= 75) return "bg-purple-600 hover:bg-purple-700";
    return "bg-teal-600 hover:bg-teal-700";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300" data-testid={`career-card-${career.id}`}>
      <div className={`w-16 h-16 bg-gradient-to-r ${getGradientColor(career.matchScore)} rounded-2xl flex items-center justify-center mb-6`}>
        <i className={`${career.icon} text-white text-2xl`}></i>
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-3">{career.title}</h4>
      <p className="text-gray-600 mb-4">{career.description}</p>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Match Score</span>
          <span className={`font-semibold ${getScoreColor(career.matchScore)}`}>{career.matchScore}%</span>
        </div>
        <Progress value={career.matchScore} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="text-sm text-gray-600 flex items-center">
          <DollarSign size={16} className="mr-2" />
          Avg. Salary: <span className="font-semibold ml-1">{career.salary}</span>
        </div>
        <div className="text-sm text-gray-600 flex items-center">
          <TrendingUp size={16} className="mr-2" />
          Growth: <span className="font-semibold text-green-600 ml-1">{career.growth}</span>
        </div>
      </div>
      <Button className={`w-full mt-4 text-white transition-colors ${getButtonColor(career.matchScore)}`}>
        Explore Path
      </Button>
    </div>
  );
}
