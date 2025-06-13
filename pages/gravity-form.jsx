import { useEffect, useState } from "react";

export default function GravityForm({ formId = 1 }) {
  const [form, setForm] = useState(null);
  const [fields, setFields] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`/api/gf/forms?formId=${formId}`)
      .then(res => res.json())
      .then(data => {
        setForm(data);
      });
  }, [formId]);

  function handleChange(e, id) {
    setFields({ ...fields, [id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Submitting...');
    const res = await fetch('/api/gf/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formId, ...fields }),
    });
    if (res.ok) {
      setStatus('Thank you! Your submission was received.');
      setFields({});
    } else {
      const err = await res.json();
      setStatus('Error: ' + (err.error || 'Unknown error'));
    }
  }

  if (!form) return <p>Loading form...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">{form.title}</h2>
      {form.fields && form.fields.map(field => (
        <div key={field.id} className="mb-4">
          <label className="block mb-1 font-semibold">{field.label}{field.isRequired && <span className="text-red-500 ml-1">*</span>}</label>
          {(() => {
            switch (field.type) {
              case 'text':
              case 'name':
              case 'phone':
              case 'website':
              case 'email':
              case 'number':
                return (
                  <input
                    className="w-full border px-3 py-2 rounded"
                    type={field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : 'text'}
                    name={`input_${field.id}`}
                    value={fields[`input_${field.id}`] || ''}
                    onChange={e => handleChange(e, `input_${field.id}`)}
                    required={field.isRequired}
                  />
                );
              case 'textarea':
                return (
                  <textarea
                    className="w-full border px-3 py-2 rounded"
                    name={`input_${field.id}`}
                    value={fields[`input_${field.id}`] || ''}
                    onChange={e => handleChange(e, `input_${field.id}`)}
                    required={field.isRequired}
                  />
                );
              case 'checkbox':
                return field.choices ? (
                  <div className="flex flex-col gap-1">
                    {field.choices.map((choice, idx) => (
                      <label key={idx} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          name={`input_${field.id}`}
                          value={choice.value}
                          checked={Array.isArray(fields[`input_${field.id}`]) ? fields[`input_${field.id}`].includes(choice.value) : false}
                          onChange={e => {
                            const prev = Array.isArray(fields[`input_${field.id}`]) ? fields[`input_${field.id}`] : [];
                            if (e.target.checked) {
                              setFields({ ...fields, [`input_${field.id}`]: [...prev, choice.value] });
                            } else {
                              setFields({ ...fields, [`input_${field.id}`]: prev.filter(v => v !== choice.value) });
                            }
                          }}
                        />
                        {choice.text}
                      </label>
                    ))}
                  </div>
                ) : null;
              case 'radio':
                return field.choices ? (
                  <div className="flex flex-col gap-1">
                    {field.choices.map((choice, idx) => (
                      <label key={idx} className="inline-flex items-center">
                        <input
                          type="radio"
                          className="mr-2"
                          name={`input_${field.id}`}
                          value={choice.value}
                          checked={fields[`input_${field.id}`] === choice.value}
                          onChange={e => handleChange(e, `input_${field.id}`)}
                          required={field.isRequired}
                        />
                        {choice.text}
                      </label>
                    ))}
                  </div>
                ) : null;
              case 'multiselect':
                return field.choices ? (
                  <select
                    className="w-full border px-3 py-2 rounded"
                    name={`input_${field.id}`}
                    value={fields[`input_${field.id}`] || []}
                    multiple
                    onChange={e => {
                      const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                      setFields({ ...fields, [`input_${field.id}`]: selected });
                    }}
                    required={field.isRequired}
                  >
                    {field.choices.map((choice, idx) => (
                      <option key={idx} value={choice.value}>{choice.text}</option>
                    ))}
                  </select>
                ) : null;
              case 'select':
                // Single select dropdown only
                return field.choices ? (
                  <select
                    className="w-full border px-3 py-2 rounded"
                    name={`input_${field.id}`}
                    value={fields[`input_${field.id}`] || ''}
                    onChange={e => handleChange(e, `input_${field.id}`)}
                    required={field.isRequired}
                  >
                    <option value="">Select...</option>
                    {field.choices.map((choice, idx) => (
                      <option key={idx} value={choice.value}>{choice.text}</option>
                    ))}
                  </select>
                ) : null;
              case 'hidden':
                return (
                  <input
                    type="hidden"
                    name={`input_${field.id}`}
                    value={fields[`input_${field.id}`] || ''}
                  />
                );
              default:
                return (
                  <input
                    className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-400"
                    type="text"
                    name={`input_${field.id}`}
                    value={fields[`input_${field.id}`] || ''}
                    disabled
                  />
                );
            }
          })()}
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      {status && <p className="mt-2">{status}</p>}
    </form>
  );
}
