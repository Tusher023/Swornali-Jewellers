'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

type Locale = 'en' | 'bn' | 'hi' | 'or';

type Language = {
  code: Locale;
  name: string;
  nativeName: string;
};

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
  },
];

export default function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;

  const [open, setOpen] = useState(false);

  const currentLanguage =
    languages.find(
      (language) => language.code === currentLocale,
    ) ?? languages[0];

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = () => {
      setOpen(false);
    };

    document.addEventListener(
      'click',
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
      );
    };
  }, [open]);

  const changeLanguage = (locale: Locale) => {
    document.cookie = [
      `NEXT_LOCALE=${locale}`,
      'path=/',
      'max-age=31536000',
      'SameSite=Lax',
    ].join('; ');

    setOpen(false);

    window.location.reload();
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
        }}
        aria-label="Select language"
        aria-expanded={open}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '7px',
          height: '38px',
          padding: '0 12px',
          border:
            '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '999px',
          background: 'transparent',
          color: '#ffffff',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontSize: '15px',
          }}
        >
          🌐
        </span>

        <span>
          {currentLanguage.nativeName}
        </span>

        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition:
              'transform 0.2s ease',
            transform: open
              ? 'rotate(180deg)'
              : 'rotate(0deg)',
          }}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            zIndex: 99999,
            width: '190px',
            padding: '8px',
            border:
              '1px solid #e5e5e5',
            borderRadius: '14px',
            background: '#ffffff',
            boxShadow:
              '0 15px 40px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            style={{
              padding:
                '8px 10px 10px',
              color: '#999999',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform:
                'uppercase',
            }}
          >
            Language
          </div>

          {languages.map((language) => {
            const selected =
              language.code ===
              currentLocale;

            return (
              <button
                key={language.code}
                type="button"
                onClick={() =>
                  changeLanguage(
                    language.code,
                  )
                }
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    'space-between',
                  gap: '10px',
                  padding: '10px 11px',
                  border: 'none',
                  borderRadius: '10px',
                  background: selected
                    ? '#f5f1e8'
                    : 'transparent',
                  color: selected
                    ? '#222222'
                    : '#555555',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    flexDirection:
                      'column',
                    gap: '2px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: selected
                        ? 600
                        : 500,
                    }}
                  >
                    {language.nativeName}
                  </span>

                  <span
                    style={{
                      color: '#999999',
                      fontSize: '11px',
                    }}
                  >
                    {language.name}
                  </span>
                </span>

                {selected && (
                  <span
                    aria-label="Selected"
                    style={{
                      color: '#b08a3e',
                      fontSize: '16px',
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}