document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const title = e.target.textContent;
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalDescription').textContent = getServiceDescription(title);
      document.getElementById('modalOverlay').style.display = 'flex';
    });
  });
  
  document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'none';
  });
  
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) {
      document.getElementById('modalOverlay').style.display = 'none';
    }
  });
  
  function getServiceDescription(title) {
    const descriptions = {
      "Emotional Regulation": "Helping clients understand and manage their emotions effectively, building resilience and emotional intelligence to navigate life’s challenges.",
      "Behavioral Therapy": "A therapeutic approach focused on modifying harmful behaviors through positive reinforcement, coping strategies, and healthy habits.",
      "Grief": "Providing support and tools to cope with loss, process emotions, and find pathways toward healing and acceptance.",
      "Depression": "Offering personalized treatment plans to address the symptoms of depression and improve overall mental well-being.",
      "Anxiety": "Helping clients manage anxiety through proven techniques, mindfulness practices, and coping strategies for a more peaceful life.",
      "Stress": "Teaching stress management techniques to help clients navigate daily pressures and enhance their mental resilience.",
      "Adjustment": "Assisting clients in adapting to significant life changes and building the skills needed to cope effectively.",
      "Separation Difficulties": "Providing support and strategies for individuals struggling with separation or loss, helping them rebuild a sense of independence and stability.",
      "Social Skills": "Improving interpersonal skills, communication, and social interactions to enhance personal and professional relationships.",
      "Full Psychoeducational Assessments": "Comprehensive assessments to identify learning needs, strengths, and challenges, guiding educational support and interventions.",
      "Career Counseling": "Assisting clients in exploring career options, setting professional goals, and developing skills for job satisfaction and success.",
      "ADHD Assessment": "Conducting thorough assessments for ADHD to provide tailored strategies for focus, organization, and productivity.",
      "Concessions & School Recommendation": "Supporting students with tailored recommendations for academic accommodations and school planning.",
    };
    return descriptions[title] || "Description not available.";
  }
  