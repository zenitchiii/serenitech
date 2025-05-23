'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const AboutPage = () => {
  const team = [
    {
      name: 'Desirie Castillo',
      role: 'Associate',
      image: '/team/dc.png',
    },
    {
      name: 'Jomari Silvestre',
      role: 'Lead Developer',
      image: '/team/js.png',
    },
    {
      name: 'Jobert Garcia',
      role: 'Associate',
      image: '/team/jg.png',
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-center py-20 px-6 sm:px-12 md:px-24">
      <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg p-10 animate-fadeIn">
        <h1 className="text-4xl font-bold font-sans mb-6 text-primary-foreground">
          About SereniTech
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Welcome to <span className="font-semibold text-primary">SereniTech</span>! We are dedicated to providing the best mental health and wellness solutions powered by technology. Our mission is to support your journey toward peace, clarity, and balance through innovative digital tools.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            To empower individuals with accessible, personalized mental health support by combining compassion and cutting-edge technology.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-4">
            Our Values
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Empathy:</strong> Understanding and supporting every user’s unique journey.
            </li>
            <li>
              <strong>Innovation:</strong> Leveraging technology to create impactful solutions.
            </li>
            <li>
              <strong>Integrity:</strong> Building trust through transparency and respect.
            </li>
            <li>
              <strong>Accessibility:</strong> Making mental health resources available to all.
            </li>
          </ul>
        </section>

        {/* Meet the Team Section */}
        <section>
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-6 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="flex flex-col items-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border border-border mb-4"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {member.name.split(' ')[0]} is passionate about mental health and driving impactful solutions at SereniTech.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
