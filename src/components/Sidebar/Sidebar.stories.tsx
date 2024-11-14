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
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: 'dashboard',
      isActive: true,
    },
    {
      title: 'Teams',
      url: '#',
      icon: 'users',
    },
    {
      title: 'Link',
      url: '#',
      icon: 'logo-link',
    },
    {
      title: 'ENV',
      url: '#',
      icon: 'logo-env',
    },
    {
      title: 'Toggle',
      url: '#',
      icon: 'logo-toggle',
      items: [
        {
          title: 'Feature Toggles',
          url: '#',
        },
        {
          title: 'Segments',
          url: '#',
        },
      ],
    },
    {
      title: 'Integrations',
      url: '#',
      icon: 'stack',
      count: 23,
    },
    {
      title: 'Settings',
      url: '#',
      icon: 'settings',
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
  return (
    <ResponsiveProvider>
      <SidebarProvider>
        <Sidebar side="left" collapsible="offcanvas">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Box
                        flex="auto"
                        direction="row"
                        gap="sm"
                        alignItems="center"
                      >
                        <Box
                          background="black"
                          borderColor="subtle"
                          borderWidth="sm"
                          width="4xl"
                          height="4xl"
                          alignItems="center"
                          justifyContent="center"
                          radius="md"
                        ></Box>
                        <span className="font-weight-semibold">
                          {activeTeam.name}
                        </span>
                      </Box>
                      <Icon name="caret-up-down" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    side="bottom"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Organizations
                    </DropdownMenuLabel>
                    {data.teams.map((team, index) => (
                      <DropdownMenuItem
                        key={team.name}
                        onClick={() => setActiveTeam(team)}
                      >
                        {team.name}
                        <DropdownMenuShortcut>
                          ⌘{index + 1}
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <a
                        href="#"
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
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                {data.navMain.map((item) =>
                  item.items ? (
                    <Collapsible
                      key={item.title}
                      className="group/collapsible"
                      asChild
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
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
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
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
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>
                          <Icon
                            name={item.icon as IconName}
                            color="tertiary"
                            size="lg"
                          />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.count && (
                        <SidebarMenuBadge>{item.count}</SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Favorites</SidebarGroupLabel>
              <SidebarMenu>
                {data.favorites.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <Icon name={item.icon as IconName} color="tertiary" />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <Icon name="dots" />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom" align="end">
                        <DropdownMenuItem>
                          <a href="#">View</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="#">Share</a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <a href="#">Remove</a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Box flex="auto" direction="column" gap="2xs">
                        <span className="font-weight-semibold">
                          {data.user.name}
                        </span>
                        <span className="truncate font-size-xs font-color-secondary">
                          {data.user.email}
                        </span>
                      </Box>
                      <Icon name="caret-up-down" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel>
                      <Box flex="auto" direction="column" gap="2xs">
                        <span className="font-weight-semibold">
                          {data.user.name}
                        </span>
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
