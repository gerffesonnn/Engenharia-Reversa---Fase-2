const historyFilters = document.querySelectorAll('.history-timeline .decade-filter');
const historyMilestones = document.querySelectorAll('.history-milestone');
const historyEmpty = document.querySelector('.history-empty');

historyFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    const decade = filter.dataset.decade;
    let visibleCount = 0;

    historyFilters.forEach(option => {
      const isActive = option === filter;
      option.classList.toggle('active', isActive);
      option.setAttribute('aria-pressed', String(isActive));
    });

    historyMilestones.forEach(milestone => {
      const isVisible = decade === 'all' || milestone.dataset.decade === decade;
      milestone.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    historyEmpty.hidden = visibleCount > 0;
  });
});