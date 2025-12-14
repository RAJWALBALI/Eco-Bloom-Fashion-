import React, { useState } from 'react';

export const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold text-center mb-12">Get in Touch</h1>
            
            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-sm h-full">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <span className="text-2xl">📍</span>
                            <div>
                                <h3 className="font-bold">Address</h3>
                                <p className="text-gray-600">The Trend Tree Store / Eco Bloom<br/>12 Fashion Street, Hyderabad, India</p>
                            </div>
                        </div>
                         <div className="flex items-start space-x-4">
                            <span className="text-2xl">📞</span>
                            <div>
                                <h3 className="font-bold">Phone</h3>
                                <p className="text-gray-600">+91 88377 00009</p>
                            </div>
                        </div>
                         <div className="flex items-start space-x-4">
                            <span className="text-2xl">📧</span>
                            <div>
                                <h3 className="font-bold">Email</h3>
                                <p className="text-gray-600">support@ecobloom.com</p>
                            </div>
                        </div>
                         <div className="flex items-start space-x-4">
                            <span className="text-2xl">🕒</span>
                            <div>
                                <h3 className="font-bold">Working Hours</h3>
                                <p className="text-gray-600">Mon–Sat, 10 AM – 8 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm">
                    {submitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="text-5xl mb-4">✨</div>
                            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-gray-600">We'll get back to you shortly.</p>
                            <button onClick={() => setSubmitted(false)} className="mt-6 text-primary underline">Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea required rows={4} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-gray-800 transition">Submit</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};