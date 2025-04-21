import React, { useEffect } from "react";

const RobotEyes = () => {
	useEffect(() => {
		const handleMouseMove = (event) => {
			eyeball(event.clientX, event.clientY);
		};

		const handleTouchMove = (event) => {
			const touch = event.touches[0];
			eyeball(touch.clientX, touch.clientY);
		};

		const eyeball = (x, y) => {
			const eyes = document.querySelectorAll(".robot-eye");
			eyes.forEach((eye) => {
				const eyeRect = eye.getBoundingClientRect();
				const eyeX = eyeRect.left + eyeRect.width / 2;
				const eyeY = eyeRect.top + eyeRect.height / 2;

				const radian = Math.atan2(x - eyeX, y - eyeY);
				const rotation = radian * (180 / Math.PI) * -1 + 315;

				eye.style.transform = `rotate(${rotation}deg)`;
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("touchmove", handleTouchMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, []);

	return (
		<div className="flex justify-center">
			<div className="robot-eye relative overflow-hidden rounded-full border border-white shadow-[0_0_15px_white] mx-[1.3rem] w-[4.45rem] h-[4.45rem] top-[8.4rem]
                max-[419px]:w-[3.6rem] max-[419px]:h-[3.6rem] max-[419px]:mx-[1rem] max-[419px]:top-[6.7rem]">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2.5rem] h-[2.5rem] rounded-full bg-white drop-shadow-[0_0_10px_rgba(255,255,255,0.575)]"></div>
			</div>
			<div className="robot-eye relative overflow-hidden rounded-full border border-white shadow-[0_0_15px_white] mx-[1.3rem] w-[4.45rem] h-[4.45rem] top-[8.4rem]
                max-[419px]:w-[3.6rem] max-[419px]:h-[3.6rem] max-[419px]:mx-[1rem] max-[419px]:top-[6.7rem]">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2.5rem] h-[2.5rem] rounded-full bg-white drop-shadow-[0_0_10px_rgba(255,255,255,0.575)]"></div>
			</div>
		</div>
	);
};

export default RobotEyes;
