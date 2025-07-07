import React from 'react';
import { Meta } from '@storybook/react';
import {
  SidebarProvider,
  Sidebar,
  SidebarRail,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarTrigger,
  useSidebar,
} from './Sidebar';
import { allModes } from '../../modes';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../Collapsible/Collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../DropdownMenu/DropdownMenu';
import { Box } from '../Box/Box';
import { IconName } from 'src/types';
import { useIsMobile } from '../../hooks/useIsMobile/useIsMobile';
import { ResponsiveProvider } from '../ResponsiveProvider/ResponsiveProvider';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    overrideDecorator: true,
    chromatic: {
      modes: {
        light: allModes['light'],
        dark: allModes['dark'],
      },
    },
  },
};

export default meta;

// This is sample data.
const data = {
  user: {
    name: 'taylor anderson',
    email: 'taylor.anderson@hyphen.ai',
    avatar: '/avatars/avatar.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
    },
    {
      name: 'Acme Corp.',
    },
    {
      name: 'Evil Corp.',
    },
  ],
  items: [
    {
      title: 'Dashboard',
      url: '#',
      icon: 'dashboard' as IconName,
      isActive: true,
    },
    {
      title: 'Deploy',
      url: '#',
      icon: 'logo-deploy' as IconName,
    },
    {
      title: 'Teams',
      url: '#',
      icon: 'users' as IconName,
    },
    {
      title: 'Link',
      url: '#',
      icon: 'logo-link' as IconName,
    },
    {
      title: 'ENV',
      url: '#',
      icon: 'logo-env' as IconName,
    },
    {
      title: 'Toggle',
      url: '#',
      icon: 'logo-toggle' as IconName,
    },
    {
      title: 'Integrations',
      url: '#',
      icon: 'stack' as IconName,
      count: 23,
    },
    {
      title: 'Settings',
      url: '#',
      icon: 'settings' as IconName,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Members',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
      ],
    },
  ],
  favorites: [
    {
      name: 'Project One',
      url: '#',
      icon: 'block',
    },
    {
      name: 'Spring Campaign Link',
      url: '#',
      icon: 'logo-link',
    },
    {
      name: 'Fall Campaign Link',
      url: '#',
      icon: 'logo-link',
    },
  ],
};

// type Story = StoryObj<typeof Sidebar>;

export const SidebarExample = () => {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const isMobile = useIsMobile();

  const STORAGE_KEY = 'sidebar_expanded_storybook';

  const startOpen = localStorage.getItem(STORAGE_KEY) || 'true';

  return (
    <ResponsiveProvider>
      <SidebarProvider
        storageKey={STORAGE_KEY}
        defaultOpen={startOpen === 'true'}
      >
        <Sidebar side="left" collapsible="icon">
          <NavHeader activeTeam={activeTeam} setActiveTeam={setActiveTeam} />
          <SidebarContent>
            <NavMain items={data.items} />
            <NavFavorites favorites={data.favorites} />
          </SidebarContent>
          <NavFooter />
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          {isMobile && <SidebarTrigger />}
          <Card height="100" padding="2xl">
            content
          </Card>
        </SidebarInset>
      </SidebarProvider>
    </ResponsiveProvider>
  );
};

export const SidebarCollapsed = () => {
  const STORAGE_KEY = 'sidebar_collapsed';

  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const isMobile = useIsMobile();
  const startOpen = localStorage.getItem(STORAGE_KEY) || 'false';

  return (
    <ResponsiveProvider>
      <SidebarProvider
        storageKey={STORAGE_KEY}
        defaultOpen={startOpen === 'true'}
      >
        <Sidebar side="left" collapsible="icon">
          <NavHeader activeTeam={activeTeam} setActiveTeam={setActiveTeam} />
          <SidebarContent>
            <NavMain items={data.items} />
            <NavFavorites favorites={data.favorites} />
          </SidebarContent>
          <NavFooter />
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          {isMobile && <SidebarTrigger />}
          <Card height="100" padding="2xl">
            content
          </Card>
        </SidebarInset>
      </SidebarProvider>
    </ResponsiveProvider>
  );
};

interface NavItem {
  title: string;
  url: string;
  icon?: IconName;
  isActive?: boolean;
  count?: number;
  items?: {
    title: string;
    url: string;
  }[];
}

const NavHeader = ({
  activeTeam,
  setActiveTeam,
}: {
  activeTeam: any;
  setActiveTeam: (team: any) => void;
}) => {
  const { state } = useSidebar();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton style={{ padding: 'var(--size-spacing-xs)' }}>
                <Box flex="auto" direction="row" gap="sm" alignItems="center">
                  <Box
                    background="black"
                    borderColor="subtle"
                    borderWidth="sm"
                    width="24px"
                    height="24px"
                    minWidth="24px"
                    minHeight="24px"
                    alignItems="center"
                    justifyContent="center"
                    radius="sm"
                    color="white"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    AC
                  </Box>
                  <span
                    className="font-weight-semibold"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {activeTeam.name}
                  </span>
                </Box>
                <Icon
                  name="caret-up-down"
                  className="group-data-collapsible-icon-hidden"
                />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side={state === 'expanded' ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Organizations
              </DropdownMenuLabel>
              {data.teams.map((team, index) => (
                <DropdownMenuItem
                  key={`team.name-${index}`}
                  onClick={() => setActiveTeam(team)}
                >
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a
                  href="https://ux.hyphen.ai"
                  className="display-flex flex-direction-row g-sm align-items-center"
                >
                  <Icon name="add" color="tertiary" />
                  <span>Create Organization</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

const NavMain = ({ items }: { items: NavItem[] }) => {
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items && state === 'expanded' ? (
            <Collapsible
              key={`${item.title}`}
              className="group/collapsible"
              asChild
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    <Icon
                      name={item.icon as IconName}
                      color="tertiary"
                      size="lg"
                    />
                    {item.title}
                    <Icon
                      name="caret-sm-right"
                      className="m-left-auto transform data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="test">
                  <SidebarMenuSub>
                    {item.items?.map((subItem, idx) => (
                      <SidebarMenuSubItem key={`${subItem.title}-${idx}`}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : item.items && state === 'collapsed' ? (
            <DropdownMenu key={`${item.title}`}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  <Icon
                    name={item.icon as IconName}
                    color="tertiary"
                    size="lg"
                  />
                  {item.title}
                  <Icon
                    name="caret-sm-right"
                    className="m-left-auto transform data-[state=open]:rotate-90"
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" sideOffset={4}>
                {item.items.map((subItem, idx) => (
                  <DropdownMenuItem key={`${subItem.title}-${idx}`}>
                    <a href={subItem.url}>
                      <span>{subItem.title}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                tooltip={item.title}
              >
                <a href={item.url}>
                  <Icon
                    name={item.icon as IconName}
                    color="tertiary"
                    size="lg"
                  />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.count && <SidebarMenuBadge>{item.count}</SidebarMenuBadge>}
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};

const NavFooter = () => {
  const { state } = useSidebar();
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton tooltip="Your Profile">
                <Icon name="user" size="lg" color="tertiary" />
                <Box flex="auto" direction="column" gap="2xs">
                  <span className="font-weight-semibold">{data.user.name}</span>
                  <span className="truncate font-size-xs font-color-secondary">
                    {data.user.email}
                  </span>
                </Box>
                <Icon
                  name="caret-up-down"
                  className="group-data-collapsible-icon-hidden"
                />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={state === 'expanded' ? 'top' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel>
                <Box flex="auto" direction="column" gap="2xs">
                  <span className="font-weight-semibold">{data.user.name}</span>
                  <span className="truncate font-size-xs font-color-secondary">
                    {data.user.email}
                  </span>
                </Box>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Icon name="user" color="tertiary" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="alarm" color="tertiary" />
                  Notifications{' '}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="logout" color="tertiary" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

const NavFavorites = ({ favorites }: { favorites: typeof data.favorites }) => (
  <SidebarGroup>
    <SidebarGroupLabel>Favorites</SidebarGroupLabel>
    <SidebarMenu>
      {favorites.map((item, idx) => (
        <SidebarMenuItem key={`${item.name}-${idx}`}>
          <SidebarMenuButton asChild tooltip={item.name}>
            <a href={item.url}>
              <Icon name={item.icon as IconName} color="tertiary" size="lg" />
              <span>{item.name}</span>
            </a>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction className="group-data-collapsible-icon-hidden">
                <Icon name="dots" />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem>
                <a href="https://ux.hyphen.ai">View</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="https://ux.hyphen.ai">Share</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href="https://ux.hyphen.ai">Remove</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarGroup>
);
