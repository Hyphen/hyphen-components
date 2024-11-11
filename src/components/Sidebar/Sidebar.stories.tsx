import React from 'react';
import { Meta } from '@storybook/react';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu/DropdownMenu';
import { Box } from '../Box/Box';
import { IconName } from 'src/types';

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
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      // logo: GalleryVerticalEnd,
      //   plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      // logo: AudioWaveform,
      //   plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      // logo: Command,
      //   plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: 'dashboard',
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
  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Box direction="row" gap="sm" alignItems="center">
                      <div className="background-color-black display-flex w-3xl h-3xl align-items-center justify-content-center br-sm"></div>
                      <span className="font-weight-semibold">
                        {activeTeam.name}
                      </span>
                    </Box>
                    <Icon name="caret-up-down" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="bottom" sideOffset={4}>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Teams
                  </DropdownMenuLabel>
                  {data.teams.map((team) => (
                    <DropdownMenuItem
                      key={team.name}
                      onClick={() => setActiveTeam(team)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        {/* <team.logo className="size-4 shrink-0" /> */}
                      </div>
                      {team.name}
                      {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      {/* <Plus className="size-4" /> */}
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Add team
                    </div>
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
                        <SidebarMenuButton icon={item.icon as IconName}>
                          <Box flex="auto">{item.title}</Box>
                          <Icon name="caret-sm-right" />
                          {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
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
                    <SidebarMenuButton icon={item.icon as IconName} asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Favorites</SidebarGroupLabel>
            <SidebarMenu>
              {data.favorites.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton icon={item.icon} asChild>
                    <a href={item.url}>
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>footer</SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <Card height="100" padding="2xl">
          content
        </Card>
      </SidebarInset>
    </SidebarProvider>
  );
};
