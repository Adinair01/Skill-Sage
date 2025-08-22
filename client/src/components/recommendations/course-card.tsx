import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/lib/types";
import { Star, Clock, Users } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming': return 'bg-blue-100 text-blue-800';
      case 'design': return 'bg-purple-100 text-purple-800';
      case 'analytics': return 'bg-teal-100 text-teal-800';
      case 'leadership': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getButtonColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming': return 'bg-blue-600 hover:bg-blue-700';
      case 'design': return 'bg-purple-600 hover:bg-purple-700';
      case 'analytics': return 'bg-teal-600 hover:bg-teal-700';
      case 'leadership': return 'bg-green-600 hover:bg-green-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300" data-testid={`course-card-${course.id}`}>
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="text-yellow-400 mr-1" size={16} />
            <span>{course.rating}</span>
          </div>
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h4>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span className="flex items-center">
            <Clock className="mr-1" size={16} />
            {course.duration}
          </span>
          <span className="flex items-center">
            <Users className="mr-1" size={16} />
            {course.students}
          </span>
        </div>
        <Button className={`w-full text-white transition-colors ${getButtonColor(course.category)}`}>
          Enroll Now - {course.price}
        </Button>
      </div>
    </div>
  );
}
