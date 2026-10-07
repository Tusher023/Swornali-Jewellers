'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomJewelryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState('');

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      setReferenceImage(null);
      setImagePreview(null);
      setImageError('Please upload a JPG, PNG, or WEBP image.');
      event.target.value = '';
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setReferenceImage(null);
      setImagePreview(null);
      setImageError('Image size must be less than 5MB.');
      event.target.value = '';
      return;
    }

    setReferenceImage(file);
    setImageError('');

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setReferenceImage(null);
    setImagePreview(null);
    setImageError('');
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Reference image:', referenceImage);

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setReferenceImage(null);
    setImagePreview(null);
    setImageError('');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">

        {/* PAGE HEADER */}
        <header className="page-header text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display text-(--gold-400) mb-4"
          >
            Design Your Dream Piece
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-(--text-secondary) text-lg max-w-2xl mx-auto"
          >
            Work with our master artisans to create bespoke jewellery
            that tells your unique story.
          </motion.p>
        </header>

        {/* PROCESS SECTION */}
        <section className="mb-20">
          <h2 className="section-title text-center mb-10 text-3xl font-display text-(--gold-400)">
            The Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: 'Share Your Vision',
                desc: 'Tell us about your dream design, budget, and timeline.',
              },
              {
                step: 2,
                title: 'Design & Quote',
                desc: 'Review 3D renders and receive a detailed, transparent quote.',
              },
              {
                step: 3,
                title: 'Crafting',
                desc: 'Our artisans bring your piece to life with meticulous care.',
              },
              {
                step: 4,
                title: 'Delivery',
                desc: 'Receive your custom masterpiece in luxury packaging.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center border border-(--gold-400)/20 bg-(--bg-card)"
              >
                <div className="w-12 h-12 rounded-full bg-(--gold-400)/10 text-(--gold-400) flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>

                <h3 className="text-xl font-display text-(--text-primary) mb-2">
                  {item.title}
                </h3>

                <p className="text-(--text-secondary) text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CUSTOM REQUEST FORM */}
        <section className="max-w-3xl mx-auto">
          <div className="glass-card p-8 md:p-10 rounded-2xl border border-(--gold-400)/20 bg-(--bg-card)">

            <h2 className="text-2xl font-display text-(--gold-400) mb-6 text-center">
              Start Your Custom Request
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-display text-(--text-primary) mb-2">
                  Request Received!
                </h3>

                <p className="text-(--text-secondary)">
                  Our design team will contact you within 24 hours.
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary mt-6"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* TWO COLUMN FIELDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* JEWELRY TYPE */}
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">
                      Jewelry Type
                    </label>

                    <select
                      required
                      className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none"
                    >
                      <option value="">Select Type</option>
                      <option value="Ring">Ring</option>
                      <option value="Necklace">Necklace</option>
                      <option value="Earrings">Earrings</option>
                      <option value="Bracelet">Bracelet</option>
                      <option value="Pendant">Pendant</option>
                      <option value="Bangle">Bangle</option>
                      <option value="Anklet">Anklet</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* MATERIAL */}
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">
                      Material
                    </label>

                    <select
                      required
                      className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none"
                    >
                      <option value="">Select Material</option>

                      <option value="9K Yellow Gold">
                        9K Yellow Gold
                      </option>

                      <option value="10K Yellow Gold">
                        10K Yellow Gold
                      </option>

                      <option value="14K Yellow Gold">
                        14K Yellow Gold
                      </option>

                      <option value="18K Yellow Gold">
                        18K Yellow Gold
                      </option>

                      <option value="22K Yellow Gold">
                        22K Yellow Gold
                      </option>

                      <option value="24K Pure Gold">
                        24K Pure Gold
                      </option>

                      <option value="9K White Gold">
                        9K White Gold
                      </option>

                      <option value="10K White Gold">
                        10K White Gold
                      </option>

                      <option value="14K White Gold">
                        14K White Gold
                      </option>

                      <option value="18K White Gold">
                        18K White Gold
                      </option>

                      <option value="9K Rose Gold">
                        9K Rose Gold
                      </option>

                      <option value="10K Rose Gold">
                        10K Rose Gold
                      </option>

                      <option value="14K Rose Gold">
                        14K Rose Gold
                      </option>

                      <option value="18K Rose Gold">
                        18K Rose Gold
                      </option>

                      <option value="925 Sterling Silver">
                        925 Sterling Silver
                      </option>

                      <option value="950 Silver">
                        950 Silver
                      </option>

                      <option value="999 Fine Silver">
                        999 Fine Silver
                      </option>
                    </select>
                  </div>

                  {/* PURITY */}
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">
                      Purity
                    </label>

                    <select
                      required
                      className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none"
                    >
                      <option value="">Select Purity</option>

                      <option value="9K">9K Gold</option>
                      <option value="10K">10K Gold</option>
                      <option value="14K">14K Gold</option>
                      <option value="18K">18K Gold</option>
                      <option value="22K">22K Gold</option>
                      <option value="24K">24K Pure Gold</option>

                      <option value="925">
                        925 Sterling Silver
                      </option>

                      <option value="950">
                        950 Silver
                      </option>

                      <option value="999">
                        999 Fine Silver
                      </option>
                    </select>
                  </div>

                  {/* STONE TYPE OPTIONAL */}
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">
                      Stone Type{' '}
                      <span className="text-(--gold-400)/70">
                        (Optional)
                      </span>
                    </label>

                    <select
                      className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none"
                    >
                      <option value="">No Stone</option>
                      <option value="Diamond">Diamond</option>
                      <option value="Ruby">Ruby</option>
                      <option value="Sapphire">Sapphire</option>
                      <option value="Emerald">Emerald</option>
                      <option value="Pearl">Pearl</option>
                      <option value="Amethyst">Amethyst</option>
                      <option value="Topaz">Topaz</option>
                      <option value="Opal">Opal</option>
                      <option value="Garnet">Garnet</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* SIZE OPTIONAL */}
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">
                      Size{' '}
                      <span className="text-(--gold-400)/70">
                        (Optional)
                      </span>
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Ring Size 6"
                      className="form-input w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none"
                    />
                  </div>

                  {/* BUDGET */}
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">
                      Budget Range
                    </label>

                    <select
                      required
                      className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none"
                    >
                      <option value="">Select Budget</option>
                      <option value="Under ৳50K">
                        Under ৳50K
                      </option>
                      <option value="৳50K-1L">
                        ৳50K - 1 Lakh
                      </option>
                      <option value="৳1L-2L">
                        ৳1 Lakh - 2 Lakhs
                      </option>
                      <option value="৳2L-5L">
                        ৳2 Lakhs - 5 Lakhs
                      </option>
                      <option value="Over ৳5L">
                        Over ৳5 Lakhs
                      </option>
                    </select>
                  </div>

                </div>

                {/* DESCRIPTION */}
                <div className="form-group">
                  <label className="form-label text-(--text-secondary) block mb-2 text-sm">
                    Description of your dream piece
                  </label>

                  <textarea
                    required
                    placeholder="Tell us about the design, inspiration, or specific details you have in mind..."
                    className="form-textarea w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none min-h-[120px]"
                  />
                </div>

                {/* REFERENCE IMAGE OPTIONAL */}
                <div className="form-group">

                  <label className="form-label text-(--text-secondary) block mb-2 text-sm">
                    Reference Image{' '}
                    <span className="text-(--gold-400)/70">
                      (Optional)
                    </span>
                  </label>

                  {!imagePreview ? (
                    <label
                      htmlFor="reference-image"
                      className="flex flex-col items-center justify-center w-full min-h-[170px] border-2 border-dashed border-(--gold-400)/30 rounded-lg bg-(--bg-secondary) hover:border-(--gold-400)/70 hover:bg-(--gold-400)/5 transition-all cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center py-6">

                        <div className="w-12 h-12 rounded-full bg-(--gold-400)/10 text-(--gold-400) flex items-center justify-center mb-3">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 16V4m0 0L8 8m4-4l4 4M5 20h14"
                            />
                          </svg>
                        </div>

                        <p className="text-sm text-(--text-primary) font-medium">
                          Click to upload reference image
                        </p>

                        <p className="text-xs text-(--text-secondary) mt-1">
                          JPG, PNG or WEBP • Maximum 5MB
                        </p>

                      </div>

                      <input
                        id="reference-image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="border border-(--gold-400)/30 rounded-lg overflow-hidden bg-(--bg-secondary)">

                      <div className="flex justify-center p-4">
                        <img
                          src={imagePreview}
                          alt="Reference preview"
                          className="max-h-72 max-w-full object-contain rounded-md"
                        />
                      </div>

                      <div className="flex items-center justify-between border-t border-(--gold-400)/20 p-3">

                        <div className="min-w-0">
                          <p className="text-sm text-(--text-primary) truncate">
                            {referenceImage?.name}
                          </p>

                          <p className="text-xs text-(--text-secondary)">
                            {referenceImage
                              ? `${(
                                  referenceImage.size /
                                  1024 /
                                  1024
                                ).toFixed(2)} MB`
                              : ''}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={removeImage}
                          className="ml-4 px-3 py-2 text-sm text-red-400 border border-red-400/30 rounded-md hover:bg-red-400/10 transition-colors"
                        >
                          Remove
                        </button>

                      </div>
                    </div>
                  )}

                  {imageError && (
                    <p className="text-red-400 text-sm mt-2">
                      {imageError}
                    </p>
                  )}

                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="btn btn-primary w-full py-4 text-lg bg-(--gold-400) text-black font-semibold rounded-md hover:bg-(--gold-500) transition-colors"
                >
                  Submit Request
                </button>

              </form>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}