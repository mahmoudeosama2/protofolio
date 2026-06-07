import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '9660bec9-7a3c-42d6-b07d-80261bdf798d';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Contact Message',
          message: form.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 5000);
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#111111] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white text-base rounded-xl px-5 py-4 outline-none transition-all duration-300 placeholder-gray-600 focus:bg-[#161616]';

  return (
    <section id="contact" className="bg-[#111111] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Have an exciting project in mind or looking for a skilled Flutter developer to join your team? Feel free to reach out!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-dark-100 p-8 rounded-3xl border border-white/5 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                required
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              <div className="text-left w-full sm:w-auto">
                {errorMessage && (
                  <p className="text-red-500 text-sm font-medium animate-pulse">{errorMessage}</p>
                )}
                {sent && (
                  <p className="text-emerald-500 text-sm font-medium">Message sent successfully!</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/80 disabled:bg-primary/50 disabled:cursor-not-allowed text-[#111111] font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(253,111,0,0.5)] flex items-center justify-center gap-2 transform hover:-translate-y-1 w-full sm:w-auto"
              >
                {loading ? (
                  'Sending...'
                ) : sent ? (
                  'Message Sent!'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
