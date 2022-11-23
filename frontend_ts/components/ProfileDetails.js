import Image from "next/image";
import { follow } from "./follow";

// import FollowUser from "./FollowUser";

export default function ProfileDetails({ profile }) {
	return (
		<section aria-labelledby="about-heading">
			<div className="rounded-lg bg-white shadow overflow-hidden pb-2">
				<div className="relative h-24 w-full object-cover lg:h-32">
					<Image
						src="/assets/background.png"
						alt="Default background"
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<div className="relative flex justify-between items-end px-6 -mt-12 sm:-mt-16">
					{profile && profile.picture && profile.picture.original ? (
						<img
							className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 border border-stone-50"
							src={profile.picture.url}
							alt={`${profile.handle} picture`}
						/>
					) : (
						<Image
							width="96"
							height="96"
							className="rounded-full"
							src="/assets/avatar.png"
							alt="Default avatar"
						/>
					)}

					<FollowUser profile={profile} />
				</div>
				<div className="relative px-6 py-4">
					<h2
						id="about-heading"
						className="text-xl font-medium text-stone-900">
						{profile.name ? profile.name : profile.handle}
					</h2>
					<h3 className="font-medium text-emerald-700 mt-1">
						@{profile.handle}
					</h3>
					<p className="mt-4">
						{profile.bio ? profile.bio : "Welcome to my homebase!"}
					</p>
					<div className="flex flex-wrap gap-x-2 text-stone-600 text-sm mt-4 justify-center md:justify-start">
						<p>
							<span className="text-stone-900 font-medium">
								{profile.stats.totalFollowers}
							</span>{" "}
							Followers
						</p>
						<p>
							<span className="text-stone-900 font-medium">
								{profile.stats.totalFollowing}
							</span>{" "}
							Following
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
