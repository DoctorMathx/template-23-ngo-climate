"use client";

import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "textarea" | "select" | "checkbox" | "date";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  half?: boolean;
  help?: string;
  defaultValue?: string;
};

type Values = Record<string, string>;

function validate(fields: FieldDef[], v: Values) {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const val = (v[f.name] ?? "").trim();
    if (f.type === "checkbox") {
      if (f.required && val !== "true") errors[f.name] = "Please confirm to continue.";
      continue;
    }
    if (f.required && !val) {
      errors[f.name] = `${f.label.replace(/\s*\(.*\)$/, "")} is required.`;
      continue;
    }
    if (!val) continue;
    if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) errors[f.name] = "Enter a valid email address.";
    if (f.type === "tel" && !/^\+?[\d\s()-]{7,}$/.test(val)) errors[f.name] = "Enter a valid phone number.";
    if (f.type === "number") {
      if (!/^\d+$/.test(val)) errors[f.name] = "Enter a whole number.";
      else {
        const n = parseInt(val, 10);
        if (f.min !== undefined && n < f.min) errors[f.name] = `Minimum is ${f.min}.`;
        if (f.max !== undefined && n > f.max) errors[f.name] = `Maximum is ${f.max}.`;
      }
    }
  }
  return errors;
}

export function SmartForm({
  fields,
  submitLabel = "Submit",
  successTitle = "Thank you!",
  successBody = "We’ve received your message and will be in touch within two working days.",
  className,
  onSuccessSummary,
}: {
  fields: FieldDef[];
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  className?: string;
  onSuccessSummary?: (v: Values) => string;
}) {
  const uid = useId();
  const initial: Values = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""]));
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [summary, setSummary] = useState("");

  const set = (name: string, val: string) => {
    const next = { ...values, [name]: val };
    setValues(next);
    if (touched) setErrors(validate(fields, next));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(fields, values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = fields.find((f) => errs[f.name]);
      if (first) document.getElementById(`${uid}-${first.name}`)?.focus();
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setSummary(onSuccessSummary ? onSuccessSummary(values) : "");
      setStatus("done");
    }, 700);
  };

  if (status === "done") {
    return (
      <div className={cn("text-center py-10 px-4", className)} role="status" aria-live="polite">
        <div className="mx-auto w-14 h-14 rounded-full bg-[color:var(--mist-2)] flex items-center justify-center text-moss">
          <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold">{successTitle}</h3>
        <p className="mt-2 text-ink-2 max-w-md mx-auto">{successBody}</p>
        {summary && <p className="mt-4 text-sm font-medium text-moss">{summary}</p>}
        <button
          type="button"
          className="btn btn-outline btn-sm mt-6"
          onClick={() => {
            setValues(initial);
            setErrors({});
            setTouched(false);
            setStatus("idle");
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className={cn("grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5", className)}>
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const err = errors[f.name];
        const errId = `${id}-err`;
        const common = {
          id,
          name: f.name,
          "aria-invalid": err ? true : undefined,
          "aria-describedby": err ? errId : f.help ? `${id}-help` : undefined,
          required: f.required,
        } as const;
        return (
          <div key={f.name} className={cn(f.half ? "sm:col-span-1" : "sm:col-span-2")}>
            {f.type === "checkbox" ? (
              <label htmlFor={id} className="flex items-start gap-3 text-[14px] text-ink-2 cursor-pointer min-h-[44px]">
                <input
                  {...common}
                  type="checkbox"
                  checked={values[f.name] === "true"}
                  onChange={(e) => set(f.name, e.target.checked ? "true" : "")}
                  className="mt-0.5 w-5 h-5 accent-[color:var(--moss)] shrink-0"
                />
                <span>{f.label}</span>
              </label>
            ) : (
              <>
                <label htmlFor={id} className="label">
                  {f.label} {f.required && <span className="text-[color:var(--danger)]" aria-hidden="true">*</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea {...common} className="input" placeholder={f.placeholder} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} />
                ) : f.type === "select" ? (
                  <select {...common} className="input" value={values[f.name]} onChange={(e) => set(f.name, e.target.value)}>
                    <option value="">{f.placeholder ?? "Select…"}</option>
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    {...common}
                    className="input"
                    type={f.type === "number" ? "text" : f.type ?? "text"}
                    inputMode={f.type === "number" ? "numeric" : undefined}
                    placeholder={f.placeholder}
                    value={values[f.name]}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                )}
              </>
            )}
            {f.help && !err && <p id={`${id}-help`} className="text-[12px] text-muted mt-1.5">{f.help}</p>}
            {err && <p id={errId} className="field-error">{err}</p>}
          </div>
        );
      })}
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
        <button type="submit" className="btn btn-forest btn-lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        {touched && Object.keys(errors).length > 0 && (
          <p className="text-[13px] text-[color:var(--danger)]" role="alert">Please fix the highlighted fields.</p>
        )}
      </div>
    </form>
  );
}
