import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const TeamSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const teamMembers = t.teamMembers;

  return (
    <section className="bg-white pb-20" id="team">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF4500] text-sm font-semibold tracking-wider uppercase mb-2 block">
            {t.ourTeam}
          </span>
          <h2 className="text-4xl font-bold text-[#000080] mb-4">
            {t.meetTeam}
          </h2>
          <div className="w-16 h-1 bg-[#000080] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.teamDescription}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              {/* Member Image */}
              <div className="mb-4 relative">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[#000080] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#FF4500] font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {member.description}
                </p>

            
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 