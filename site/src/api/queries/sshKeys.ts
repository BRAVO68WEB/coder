import { API } from "api/api";
import type { GitSSHKey } from "api/typesGenerated";
import type { QueryClient } from "react-query";

const getUserSSHKeyQueryKey = (userId: string) => [userId, "sshKey"];

export const userSSHKey = (userId: string) => {
	return {
		queryKey: getUserSSHKeyQueryKey(userId),
		queryFn: () => API.getUserSSHKey(userId),
	};
};

export const regenerateUserSSHKey = (
	userId: string,
	queryClient: QueryClient,
) => {
	return {
		mutationFn: () => API.regenerateUserSSHKey(userId),
		onSuccess: (newKey: GitSSHKey) => {
			queryClient.setQueryData(getUserSSHKeyQueryKey(userId), newKey);
		},
	};
};
