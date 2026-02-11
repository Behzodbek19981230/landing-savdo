// Default placeholder image as SVG data URL
// Chinni mahsulotlar uchun mos dizayn
export const getDefaultImage = (): string => {
	// SVG placeholder with gradient matching the app theme and elegant china/ceramic design
	const svg = `
		<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#0066FF;stop-opacity:0.08" />
					<stop offset="50%" style="stop-color:#0052CC;stop-opacity:0.12" />
					<stop offset="100%" style="stop-color:#0066FF;stop-opacity:0.08" />
				</linearGradient>
				<linearGradient id="dishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.95" />
					<stop offset="100%" style="stop-color:#F8F9FA;stop-opacity:0.9" />
				</linearGradient>
				<linearGradient id="shadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" style="stop-color:#000000;stop-opacity:0.05" />
					<stop offset="100%" style="stop-color:#000000;stop-opacity:0.15" />
				</linearGradient>
				<filter id="blur">
					<feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
				</filter>
			</defs>
			
			<!-- Background -->
			<rect width="800" height="800" fill="url(#bgGrad)"/>
			
			<!-- Elegant China Dish/Cup Illustration -->
			<g transform="translate(400, 400)">
				<!-- Shadow -->
				<ellipse cx="0" cy="120" rx="140" ry="20" fill="url(#shadowGrad)" filter="url(#blur)"/>
				
				<!-- Main Dish/Bowl -->
				<g transform="translate(0, -20)">
					<!-- Bowl body -->
					<path d="M-100, 40 Q-100, 0 0, 0 Q100, 0 100, 40 L100, 100 Q100, 120 80, 120 L-80, 120 Q-100, 120 -100, 100 Z" 
						fill="url(#dishGrad)" 
						stroke="#E0E7FF" 
						stroke-width="2" 
						opacity="0.9"/>
					
					<!-- Inner rim highlight -->
					<ellipse cx="0" cy="40" rx="100" ry="8" fill="#FFFFFF" opacity="0.6"/>
					
					<!-- Decorative pattern lines -->
					<path d="M-80, 60 Q0, 50 80, 60" stroke="#0066FF" stroke-width="1.5" opacity="0.2" fill="none"/>
					<path d="M-70, 80 Q0, 70 70, 80" stroke="#0052CC" stroke-width="1" opacity="0.15" fill="none"/>
					
					<!-- Elegant handle (for cup) -->
					<path d="M 100, 60 Q 130, 50 130, 80 Q 130, 110 100, 100" 
						fill="none" 
						stroke="#E0E7FF" 
						stroke-width="3" 
						opacity="0.4"
						stroke-linecap="round"/>
				</g>
				
				<!-- Decorative elements -->
				<circle cx="-120" cy="-60" r="8" fill="#0066FF" opacity="0.1"/>
				<circle cx="120" cy="-60" r="6" fill="#0052CC" opacity="0.1"/>
				<circle cx="0" cy="-100" r="5" fill="#0066FF" opacity="0.08"/>
			</g>
			
			<!-- Subtle pattern overlay -->
			<defs>
				<pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
					<circle cx="20" cy="20" r="1" fill="#0066FF" opacity="0.03"/>
				</pattern>
			</defs>
			<rect width="800" height="800" fill="url(#dots)"/>
		</svg>
	`;
	return `data:image/svg+xml;base64,${btoa(svg)}`;
};
