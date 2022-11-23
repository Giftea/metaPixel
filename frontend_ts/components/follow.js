import {
	getAddressFromSigner,
	signedTypeData,
	splitSignature,
} from "../ethers.service";

import { createFollowTypedData } from "../lensCalls";
import { lensHub } from "../lens-hub";

export const follow = async (profileId) => {
	const address = getAddressFromSigner();
	const result = await createFollowTypedData({
		follow: [
			{
				profile: profileId,
			},
		],
	});
	console.log("follow: result", result);

	const typedData = result.typedData;
	console.log("follow: typedData", typedData);

	const signature = await signedTypeData(
		typedData.domain,
		typedData.types,
		typedData.value
	);
	console.log("follow: signature", signature);

	const { v, r, s } = splitSignature(signature);

	const tx = await lensHub.followWithSig({
		follower: getAddressFromSigner(),
		profileIds: typedData.value.profileIds,
		datas: typedData.value.datas,
		sig: {
			v,
			r,
			s,
			deadline: typedData.value.deadline,
		},
	});
	console.log("follow: tx hash", tx.hash);
	return tx.hash;
};

(async () => {
	if (argsBespokeInit()) {
		await follow();
	}
})();
