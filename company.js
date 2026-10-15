const milestoneFilters = document.querySelectorAll('.decade-filter');
const milestoneItems = document.querySelectorAll('.milestone');
const emptyMilestones = document.querySelector('.milestone-empty');

milestoneFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    const decade = filter.dataset.decade;
    let visibleCount = 0;

    milestoneFilters.forEach(option => {
      const isActive = option === filter;
      option.classList.toggle('active', isActive);
      option.setAttribute('aria-pressed', String(isActive));
    });

    milestoneItems.forEach(item => {
      const isVisible = decade === 'all' || item.dataset.decade === decade;
      item.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    emptyMilestones.hidden = visibleCount > 0;
  });
});

const milestoneDialog = document.getElementById('milestoneDialog');
const milestoneProfiles = {
  foundation: ['1963', 'https://www.lamborghini.com/en-en/history/milestones#milestone-1963'],
  miura: ['1966', 'https://www.lamborghini.com/en-en/history/milestones#milestone-1966'],
  countach: ['1974', 'https://www.lamborghini.com/en-en/history/milestones#milestone-1974'],
  lm002: ['1986', 'https://www.lamborghini.com/en-en/history/milestones#milestone-1986'],
  diablo: ['1990', 'https://www.lamborghini.com/en-en/history/milestones#milestone-1990'],
  audi: ['2001', 'https://www.lamborghini.com/en-en/history/milestones#milestone-2001'],
  aventador: ['2011', 'https://www.lamborghini.com/en-en/history/milestones#milestone-2011'],
  urus: ['2018', 'https://www.lamborghini.com/en-en/history/milestones#milestone-2018'],
  electrification: ['2024', 'https://www.lamborghini.com/en-en/history/milestones#milestone-2024']
};

if (milestoneDialog) {
  document.querySelectorAll('[data-milestone]').forEach(button => {
    button.addEventListener('click', () => {
      const milestone = button.closest('.milestone');
      const profile = milestoneProfiles[button.dataset.milestone];
      document.getElementById('milestoneDialogYear').textContent = profile[0];
      document.getElementById('milestoneDialogTitle').textContent = milestone.querySelector('h3').textContent;
      document.getElementById('milestoneDialogCopy').textContent = milestone.querySelector('p').textContent;
      document.getElementById('milestoneDialogLink').href = profile[1];
      milestoneDialog.showModal();
    });
  });
}

const leadershipProfiles = {
  stephan: {
    name: 'Stephan Winkelmann',
    role: 'Chairman and Chief Executive Officer',
    summary: 'After leadership roles at Fiat Auto, Audi Sport and Bugatti, he returned to Lamborghini as Chairman and CEO in 2020.'
  },
  douglas: {
    name: 'Douglas Arrighi Pereira',
    role: 'Chief People, Culture and Organization Officer',
    summary: 'Leads the company’s people, culture and organization responsibilities.'
  },
  federico: {
    name: 'Federico Foschini',
    role: 'Chief Marketing and Sales Officer',
    summary: 'Leads Lamborghini’s marketing and sales organization.'
  },
  silvano: {
    name: 'Silvano Michieli',
    role: 'Chief Procurement Officer',
    summary: 'Leads the company’s procurement organization.'
  },
  ranieri: {
    name: 'Ranieri Niccoli',
    role: 'Chief Manufacturing Officer',
    summary: 'Leads the manufacturing organization at Automobili Lamborghini.'
  },
  matteo: {
    name: 'Matteo Ortenzi',
    role: 'General Secretary and Chief Strategy Officer',
    summary: 'Combines the general secretary role with responsibility for corporate strategy.'
  },
  paolo: {
    name: 'Paolo Poma',
    role: 'Managing Director and Chief Financial Officer',
    summary: 'Leads financial operations as Managing Director and Chief Financial Officer.'
  },
  fermin: {
    name: 'Fermín Soneira',
    role: 'Chief Technical Officer',
    summary: 'Leads the technical organization and its engineering direction.'
  }
};

const biographyDialog = document.getElementById('biographyDialog');
if (biographyDialog) {
  document.querySelectorAll('[data-biography]').forEach(button => {
    button.addEventListener('click', () => {
      const profile = leadershipProfiles[button.dataset.biography];
      document.getElementById('biographyDialogTitle').textContent = profile.name;
      document.getElementById('biographyDialogRole').textContent = profile.role;
      document.getElementById('biographyDialogCopy').textContent = profile.summary;
      biographyDialog.showModal();
    });
  });
}

document.querySelectorAll('.company-dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
});

const companyTopics = document.querySelectorAll('.company-topic[id]');
const companySectionLinks = document.querySelectorAll('.company-section-link');
if (companyTopics.length && companySectionLinks.length && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      companySectionLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  companyTopics.forEach(topic => sectionObserver.observe(topic));
}

const governanceTrack = document.getElementById('governance-card-track');
const governanceCards = governanceTrack ? Array.from(governanceTrack.querySelectorAll('.governance-card')) : [];
const governancePages = document.querySelectorAll('.governance-pagination button');
if (governanceTrack && governanceCards.length && governancePages.length) {
  const scrollToGovernancePage = index => {
    const maxScroll = governanceTrack.scrollWidth - governanceTrack.clientWidth;
    const destination = maxScroll * index / (governancePages.length - 1);
    governanceTrack.scrollTo({ left: destination, behavior: 'auto' });
    governancePages.forEach((page, pageIndex) => {
      if (pageIndex === index) page.setAttribute('aria-current', 'true');
      else page.removeAttribute('aria-current');
    });
  };

  governancePages.forEach((page, index) => {
    page.addEventListener('click', () => scrollToGovernancePage(index));
  });

  let scrollFrame = 0;
  governanceTrack.addEventListener('scroll', () => {
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      const maxScroll = governanceTrack.scrollWidth - governanceTrack.clientWidth;
      const activeIndex = maxScroll === 0
        ? 0
        : Math.round(governanceTrack.scrollLeft / maxScroll * (governancePages.length - 1));
      governancePages.forEach((page, index) => {
        if (index === activeIndex) page.setAttribute('aria-current', 'true');
        else page.removeAttribute('aria-current');
      });
      scrollFrame = 0;
    });
  });
}

const earlyCareersToggle = document.querySelector('.early-careers-toggle');
const earlyCareersMenu = document.getElementById('early-careers-menu');
if (earlyCareersToggle && earlyCareersMenu) {
  earlyCareersToggle.addEventListener('click', () => {
    const isExpanded = earlyCareersToggle.getAttribute('aria-expanded') === 'true';
    earlyCareersToggle.setAttribute('aria-expanded', String(!isExpanded));
    earlyCareersMenu.hidden = isExpanded;
  });

  document.addEventListener('click', event => {
    if (!earlyCareersToggle.parentElement.contains(event.target)) {
      earlyCareersToggle.setAttribute('aria-expanded', 'false');
      earlyCareersMenu.hidden = true;
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      earlyCareersToggle.setAttribute('aria-expanded', 'false');
      earlyCareersMenu.hidden = true;
    }
  });
}
