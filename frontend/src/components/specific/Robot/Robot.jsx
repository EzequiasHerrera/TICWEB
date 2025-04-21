import RobotEyes from "../RobotEyes/RobotEyes";
import robot from '@/assets/images/roboy.webp';

const Robot = () => {
	return (
		<div
			className="bg-[url('/images/roboy.webp')] bg-cover w-[25rem] h-[25rem] min-h-[25rem] mb-8 max-[419px]:w-[20rem] max-[419px]:h-[20rem] max-[419px]:min-h-[20rem]"
		>
			<RobotEyes />
		</div>
	);
};

export default Robot;