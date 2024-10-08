import { type UserFilterMenu, UserMenu } from "components/Filter/UserFilter";
import {
	Filter,
	MenuSkeleton,
	SearchFieldSkeleton,
	type useFilter,
} from "components/Filter/filter";
import { useDashboard } from "modules/dashboard/useDashboard";
import type { FC } from "react";
import { docs } from "utils/docs";
import {
	type StatusFilterMenu,
	StatusMenu,
	type TemplateFilterMenu,
	TemplateMenu,
} from "./menus";

export const workspaceFilterQuery = {
	me: "owner:me",
	all: "",
	running: "status:running",
	failed: "status:failed",
	dormant: "dormant:true",
	outdated: "outdated:true",
};

type FilterPreset = {
	query: string;
	name: string;
};

// Can't use as const declarations to make arrays deep readonly because that
// interferes with the type contracts for Filter
const PRESET_FILTERS: FilterPreset[] = [
	{
		query: workspaceFilterQuery.me,
		name: "My workspaces",
	},
	{
		query: workspaceFilterQuery.all,
		name: "All workspaces",
	},
	{
		query: workspaceFilterQuery.running,
		name: "Running workspaces",
	},
	{
		query: workspaceFilterQuery.failed,
		name: "Failed workspaces",
	},
	{
		query: workspaceFilterQuery.outdated,
		name: "Outdated workspaces",
	},
];

// Defined outside component so that the array doesn't get reconstructed each render
const PRESETS_WITH_DORMANT: FilterPreset[] = [
	...PRESET_FILTERS,
	{
		query: workspaceFilterQuery.dormant,
		name: "Dormant workspaces",
	},
];

type WorkspaceFilterProps = {
	filter: ReturnType<typeof useFilter>;
	error?: unknown;
	menus: {
		user?: UserFilterMenu;
		template: TemplateFilterMenu;
		status: StatusFilterMenu;
	};
};

export const WorkspacesFilter: FC<WorkspaceFilterProps> = ({
	filter,
	error,
	menus,
}) => {
	const { entitlements } = useDashboard();
	const presets = entitlements.features.advanced_template_scheduling.enabled
		? PRESETS_WITH_DORMANT
		: PRESET_FILTERS;

	return (
		<Filter
			presets={presets}
			isLoading={menus.status.isInitializing}
			filter={filter}
			error={error}
			learnMoreLink={docs("/workspaces#workspace-filtering")}
			options={
				<>
					{menus.user && <UserMenu menu={menus.user} />}
					<TemplateMenu {...menus.template} />
					<StatusMenu {...menus.status} />
				</>
			}
			skeleton={
				<>
					<SearchFieldSkeleton />
					{menus.user && <MenuSkeleton />}
					<MenuSkeleton />
					<MenuSkeleton />
				</>
			}
		/>
	);
};
