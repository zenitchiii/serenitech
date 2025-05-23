'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccess('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate sending message
    setTimeout(() => {
      setSuccess('Thank you for your message! We will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-20">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-primary">Contact Us</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-md border border-gray-300 px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-md border border-gray-300 px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className={`w-full rounded-md border border-gray-300 px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.message ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Write your message here"
              />
              {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>

            {success && <p className="mt-4 text-center text-green-600 font-medium">{success}</p>}
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Contact;
