export function Illustration({ kind = 0, className = '' }: { kind?: number; className?: string }) {
  return (
    <svg
      className={`illustration ${className}`}
      viewBox="0 0 280 230"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="141" cy="211" rx="83" ry="10" fill="currentColor" opacity=".09" />
      {kind % 4 === 0 && (
        <>
          <path d="M94 93 112 68 196 84 176 110Z" fill="#207B61" />
          <path d="M94 93 176 110 176 177 94 160Z" fill="#3C9C7E" />
          <path d="M176 110 196 84 196 151 176 177Z" fill="#125540" />
          <path d="M88 81 108 56 184 71 164 96Z" fill="#F7F7D7" />
          <path d="M88 81 164 96 164 106 88 91Z" fill="#D4D9B4" />
          <path d="M164 96 184 71 184 81 164 106Z" fill="#ABB897" />
          <path
            d="m108 116 10 3m26 3 10 3"
            stroke="#113D32"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M123 140q9 11 18 3" stroke="#113D32" strokeWidth="4" strokeLinecap="round" />
          <path
            d="m108 163-9 34 20 4m38-28 2 29 20-3"
            stroke="#124A3A"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m94 125-26 12-11-17m128 12 27-12 4-19"
            stroke="#124A3A"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="m212 69 4-15m11 24 15-5m-16 21 13 6"
            stroke="#DE875C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="56" cy="104" r="12" fill="#F5C765" />
          <path d="m56 96v16m-8-8h16" stroke="#8F642B" strokeWidth="2" />
          <path d="m68 60 4-9 4 9 9 4-9 4-4 9-4-9-9-4Z" fill="#207B61" />
        </>
      )}
      {kind % 4 === 1 && (
        <>
          <path
            d="M84 151V99a53 53 0 0 1 106 0v52h-34V99a19 19 0 0 0-38 0v52Z"
            fill="#9F412B"
            transform="translate(11 -7)"
          />
          <path d="M84 151V99a53 53 0 0 1 106 0v52h-34V99a19 19 0 0 0-38 0v52Z" fill="#F17E53" />
          <path d="m84 151 11-7h34l-11 7Zm72 0 11-7h34l-11 7Z" fill="#D65C39" />
          <path
            d="m96 154-8 40 20 2m70-42 8 40 20-2"
            stroke="#74382B"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="m89 112-23 5-9-18m131 9 25-11 5-20"
            stroke="#74382B"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="122" cy="65" r="3.5" fill="#6B3225" />
          <circle cx="148" cy="65" r="3.5" fill="#6B3225" />
          <path d="M129 78q8 6 14-1" stroke="#6B3225" strokeWidth="3" strokeLinecap="round" />
          <path d="m218 43-5 12 13-1-12 17 5-13-12 2Z" fill="#E3AD39" />
          <path
            d="m60 62 9-9m-17-2 2-10m-9 20-10-1"
            stroke="#D5815C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect
            x="220"
            y="141"
            width="19"
            height="19"
            rx="4"
            transform="rotate(20 220 141)"
            fill="#8A9D79"
          />
        </>
      )}
      {kind % 4 === 2 && (
        <>
          <path d="m89 80 49-29 58 29-48 31Z" fill="#D1BFF1" />
          <path d="m89 80 59 31v30l-59-30Z" fill="#9B7BC1" />
          <path d="m148 111 48-31v30l-48 31Z" fill="#6C5092" />
          <path d="m89 120 59 30 48-29v30l-48 29-59-30Z" fill="#9B7BC1" />
          <path d="m148 150 48-29v30l-48 29Z" fill="#6C5092" />
          <path
            d="m101 154-3 41 19 3m55-30 10 29 18-6"
            stroke="#4F3B6B"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="m89 106-25 10-9-23m141 9 20-19-3-18"
            stroke="#4F3B6B"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path d="m111 103 7 4m16 8 7 3" stroke="#433156" strokeWidth="4" strokeLinecap="round" />
          <path d="m119 119 8 4" stroke="#433156" strokeWidth="3" strokeLinecap="round" />
          <path d="M215 35v15m-7-7h15" stroke="#9B7BC1" strokeWidth="3" strokeLinecap="round" />
          <circle cx="56" cy="70" r="10" stroke="#C6AC70" strokeWidth="3" />
          <path d="m215 144 10-5 10 5-10 6Z" fill="#D1BFF1" />
        </>
      )}
      {kind % 4 === 3 && (
        <>
          <path d="m82 77 34-21 79 21-31 24Z" fill="#CEE0F5" />
          <path d="m82 77 82 24v66l-82-23Z" fill="#8CB4E2" />
          <path d="m164 101 31-24v67l-31 23Z" fill="#5984B7" />
          <path
            d="m100 151-9 44 20 2m49-36 12 36 20-4"
            stroke="#365678"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="m82 111-25 3-8-17m144 9 25-15 1-17"
            stroke="#365678"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path d="m99 106 13 4m27 3 13 4" stroke="#365678" strokeWidth="4" strokeLinecap="round" />
          <path
            d="m105 107-3 12 15 4 3-12m23 6-3 12 15 4 3-12m-20 0-9-2"
            stroke="#365678"
            strokeWidth="3"
          />
          <path d="m119 137 13 4" stroke="#365678" strokeWidth="3" strokeLinecap="round" />
          <path d="m212 42 8 5-8 5-8-5Z" fill="#D6A64E" />
          <path d="m54 53 8-4m-9-7 5-8" stroke="#8CB4E2" strokeWidth="3" strokeLinecap="round" />
          <rect
            x="213"
            y="143"
            width="22"
            height="22"
            rx="3"
            transform="rotate(-14 213 143)"
            fill="#D9B680"
          />
          <path d="m219 152 4 3 6-9" stroke="#927644" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
