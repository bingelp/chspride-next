import { createPreprClient } from "@preprio/nodejs-sdk";

const prepr = createPreprClient({
  token: process.env.PREPR_PUBLISHED_ACCESS_TOKEN,
  baseUrl: "https://graphql.prepr.io/graphql",
  userId: null,
});

export { prepr };

export async function getTeamMembersPage(preview: boolean) {
  const data =
    (await prepr
      .graphqlQuery(
        `{
	TeamPage { 
		_id
		title
		description
		executive_committee { 
 title
        full_name
        email
        bio
        profile_pic {
          url
        }
				subjective
        possessive
        objective
		}
		board_members { 
 title
        full_name
        email
        bio
        profile_pic {
          url
        }
				subjective
        possessive
        objective
		}
	}
}`
      )
      .fetch()) || {};

  return data.data.TeamPage as TeamPage;
}

export async function getSponsorshipsPage() {
  const data =
    (await prepr
      .graphqlQuery(
        `query{
  SponsorshipPage { 
		_id
		title
		description
		subtitle
		call_to_action
		registration
		registration_form { 
			_id
			url
			height
			width
		}
		closed_message
		naming_rights
		media_posts
		tshirt_recognition
		vendor_plot
		festival_ticket
		swag_bags
    sponsorship_badge
		prism_ticket
		logo_attribution
		festival_ticket_value
		swag_bag_value
		prism_ticket_value
		large_plot_value
		small_plot_value
	}}`
      )
      .fetch()) || {};

  return data.data.SponsorshipPage as SponsorshipPage;
}

export async function getSponsorships() {
  const data =
    (await prepr
      .graphqlQuery(
        `query {
  Sponsorships(sort: price_DESC) {
    total
    items {
      _id
      level
      price
      naming_rights
      media_posts
      tshirt_recognition
      vendor_plot_size
      festival_tickets
      swag_bags
      prism_tickets
    }
  }}`
      )
      .fetch()) || {};

  return data.data.Sponsorships as Sponsorships;
}

export async function getSponsors() {
  const data =
    (await prepr
      .graphqlQuery(
        `query {
  Sponsors {
    total
    items {
		name
		website
		sponsorship { 
    css_selector
    price
  }
		logo { 
			url
		}
	}
    }
  }`
      )
      .fetch()) || {};

  return data.data.Sponsors.items as Sponsor[];
}

export async function getHomePage() {
  const data =
    (await prepr
      .graphqlQuery(
        `
  {
	HomePage { 
		title
		subtitle
    buttons {
      text
      href
    }
		sections { 
    title
    theme
    subtitle
    show_image_shadow
    show_background_stack
    buttons {
      text
      href
    }
    image {
      url
      caption
    }
    focus_on_content
    description
    icon
  }
		show_sponsorships_section
		show_apply_section
		show_donate_section
		show_volunteer_section
		show_sponsors_section
		seo { 
			title
			description
			social_media_image { 
				url
			}
		}
	}
}`
      )
      .fetch()) || {};
  return data.data.HomePage as HomePage;
}

export async function getAppConfig() {
  const data =
    (await prepr
      .graphqlQuery(
        `query{
  Sponsors{
	AppConfig { 
		app_name
		seo { 
			title
			description
			social_media_image { 
				url
			}
		}
	}
}`
      )
      .fetch()) || {};

  return data.data.AppConfig as AppConfig;
}

// Type Definitions

export type AppConfig = {
  seo: Seo;
};

// Pages

export type HomePage = {
  title: string;
  subtitle: string;
  buttons: Button[];
  sections: ContentSection[];
  show_sponsorships_section: boolean;
  show_apply_section: boolean;
  show_donate_section: boolean;
  show_volunteer_section: boolean;
  show_sponsors_section: boolean;
  seo: Seo;
};

export type TeamPage = {
  title: string;
  description: string;
  executive_committee: TeamMember[];
  board_members: TeamMember[];
};

export type SponsorshipPage = {
  title: string;
  description: string;
  subtitle: string;
  call_to_action: string;
  registration: boolean;
  registration_form: EmbeddedForm;
  closed_message: string;
  naming_rights: string;
  media_posts: string;
  tshirt_recognition: string;
  vendor_plot: string;
  festival_ticket: string;
  swag_bags: string;
  prism_ticket: string;
  logo_attribution: string;
  sponsorship_badge: string;
  festival_ticket_value: number;
  swag_bag_value: number;
  prism_ticket_value: number;
  large_plot_value: number;
  small_plot_value: number;
};

// Models
export type TeamMember = {
  title: string;
  full_name: string;
  email: string;
  bio: string;
  profile_pic: [{ url: string }];
  subjective: string;
  possessive: string;
  objective: string;
};

export type Sponsorships = {
  total: number;
  items: [
    {
      _id: string;
      level: string;
      price: number;
      naming_rights: boolean;
      media_posts: boolean;
      tshirt_recognition: boolean;
      vendor_plot_size: string;
      festival_tickets: number;
      swag_bags: number;
      prism_tickets: number;
    }
  ];
};

export type Sponsor = {
  name: string;
  website: string;
  logo: [{ url: string }];
  sponsorship: [{ price: number; css_selector: string }];
};

export type ContentSection = {
  title: string;
  theme: string;
  subtitle: string;
  description: string;
  buttons: Button[];
  show_image_shadow: boolean;
  show_background_stack: boolean;
  focus_on_content: boolean;
  image: Image[];
  icon: string;
};

// Components

export type Button = {
  text: string;
  href: string;
};

export type Seo = {
  title: string;
  description: string;
  social_media_image: {
    url: string;
  };
};

export type EmbeddedForm = {
  height: string;
  url: string;
  width: string;
};

export type Image = {
  url: string;
  caption: string;
};
