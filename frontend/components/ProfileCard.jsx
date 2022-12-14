import cn from 'classnames'
import { FC, memo } from 'react'
import LensAvatar from './LensAvatar'
import VerifiedIcon from './Icons/VerifiedIcon'

const ProfileCard = ({ profile, verified, className, selected, onSelect }) => {
	return (
		<div
			className={cn(
				'grid grid-cols-auto/fr gap-x-4 items-center p-5',
				'transition-colors',
				{
					'bg-dde7ea/30': selected,
					'cursor-pointer': onSelect,
					'hover:bg-dde7ea/10': !selected && onSelect,
				},
				className
			)}
			onClick={() => onSelect?.(profile.id)}
		>
			<span className="relative w-[80px] h-[80px]">
				<LensAvatar className="absolute inset-0 rounded-full border" profile={profile} />
				{verified && (
					<span className="rounded-full absolute -bottom-1 -right-1">
						<VerifiedIcon
							width={30}
							height={30}
							border="text-white"
							className={`${verified == 'pending' ? 'animate-pulse' : ''}`}
						/>
					</span>
				)}
			</span>

			<div className="grid gap-y-0.5">
				<div className="flex items-center gap-x-1">
					<p className="font-medium text-20">{profile.name}</p>
				</div>

				<p className="text-14 text-183c4a/50">
					<span>@{profile.handle}</span>

					{verified && (
						<>
							<span>&nbsp;&bull;&nbsp;</span>

							<span
								className={`bg-gradient-to-b from-4940e0 to-7c74fb text-transparent bg-clip-text ${
									verified == 'pending' ? 'animate-pulse' : ''
								}`}
							>
								Verified Human
							</span>
						</>
					)}
				</p>
			</div>
		</div>
	)
}

export default memo(ProfileCard)
