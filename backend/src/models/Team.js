import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Fahrenheit Cricket Club',
    },
    location: {
      type: String,
      required: true,
      default: 'Coimbatore',
    },
    establishedDate: {
      type: String,
      required: true,
      default: '2023-08-24',
    },
    cricheroesTeamId: {
      type: String,
      required: true,
      default: '4978895',
    },
    logo: {
      type: String,
      default: '/logo.png',
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop',
    },
    description: {
      type: String,
      default: 'Fahrenheit Cricket Club is a premier competitive cricket team from Coimbatore, established on 24 August 2023. Registered on the CricHeroes digital platform (Team ID: 4978895), the club represents fierce passion, teamwork, and disciplined cricketing spirit.',
    },
    vision: {
      type: String,
      default: 'To compete at the highest standards of club cricket in Coimbatore and beyond, fostering camaraderie, athletic distinction, and fair play.',
    },
    values: {
      type: [String],
      default: ['Passion', 'Performance', 'Brotherhood', 'Integrity', 'Discipline'],
    },
    socialLinks: {
      cricheroes: {
        type: String,
        default: 'https://cricheroes.com/team-profile/4978895/fahrenheit-cricket-club',
      },
      instagram: {
        type: String,
        default: 'https://www.instagram.com/fahrenheit_cricket_club?stkn=MWN5b2dxYmY4eHVncQ%3D%3D',
      },
      youtube: {
        type: String,
        default: '',
      },
      whatsapp: {
        type: String,
        default: 'https://wa.me/919003910149',
      },
    },
    contact: {
      email: {
        type: String,
        default: 'anbuselvanm2005@gmail.com',
      },
      phone: {
        type: String,
        default: '9003910149',
      },
      phoneFormatted: {
        type: String,
        default: '+91 90039 10149',
      },
      instagram: {
        type: String,
        default: 'https://www.instagram.com/fahrenheit_cricket_club?stkn=MWN5b2dxYmY4eHVncQ%3D%3D',
      },
      instagramHandle: {
        type: String,
        default: '@fahrenheit_cricket_club',
      },
      admin: {
        name: {
          type: String,
          default: 'Vicky',
        },
        role: {
          type: String,
          default: 'Club Administrator & Captain',
        },
        email: {
          type: String,
          default: 'anbuselvanm2005@gmail.com',
        },
        phone: {
          type: String,
          default: '9003910149',
        },
      },
    },
    statsSummary: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model('Team', teamSchema);

export default Team;
