import React, { useState } from 'react';
import { Search, Bell, Clock, Star, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('all');
  
  const courses = [
    {
      id: 1,
      title: 'Learn Figma',
      instructor: 'Christopher Morgan',
      duration: '6h 30min',
      rating: 4.8,
      icon: '🎨',
      color: '#3b82f6'
    },
    {
      id: 2,
      title: 'Analog photography',
      instructor: 'Gordon Norman',
      duration: '3h 15min',
      rating: 4.7,
      icon: '📷',
      color: '#1f2937'
    },
    {
      id: 3,
      title: 'Master Instagram',
      instructor: 'Sophie Gill',
      duration: '7h 40min',
      rating: 4.6,
      icon: '📸',
      color: '#e91e63'
    },
    {
      id: 4,
      title: 'Basics of drawing',
      instructor: 'Jean Tate',
      duration: '11h 30min',
      rating: 4.8,
      icon: '✏️',
      color: '#d97706'
    },
    {
      id: 5,
      title: 'Photoshop - Essence',
      instructor: 'David Greek',
      duration: '5h 35min',
      rating: 4.7,
      icon: '🎨',
      color: '#2563eb'
    }
  ];

  const weeklyData = [
    { day: 'mon', hours: 0 },
    { day: 'tue', hours: 1.4 },
    { day: 'wed', hours: 2.3 },
    { day: 'thu', hours: 1 },
    { day: 'fri', hours: 4 },
    { day: 'sat', hours: 3 },
    { day: 'sun', hours: 2 }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div style={styles.container}>
      {/* Welcome Section with Illustration */}
      <div style={styles.welcomeSection}>
        <div style={styles.welcomeContent}>
          <h2 style={styles.welcomeTitle}>Hello Josh!</h2>
          <p style={styles.welcomeText}>It's good to see you again.</p>
        </div>
        <div style={styles.illustrationContainer}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={styles.illustration}>
            {/* Head */}
            <ellipse cx="60" cy="35" rx="25" ry="28" fill="#f5d7b1" />
            
            {/* Hair */}
            <path d="M 35 25 Q 35 10 60 10 Q 85 10 85 25 L 85 35 Q 85 20 60 20 Q 35 20 35 35 Z" fill="#1a1a1a" />
            
            {/* Eyes - excited big eyes */}
            <ellipse cx="48" cy="35" rx="8" ry="10" fill="#ffffff" stroke="#000" strokeWidth="2" />
            <ellipse cx="72" cy="35" rx="8" ry="10" fill="#ffffff" stroke="#000" strokeWidth="2" />
            <circle cx="48" cy="36" r="4" fill="#000" />
            <circle cx="72" cy="36" r="4" fill="#000" />
            <circle cx="49" cy="34" r="2" fill="#fff" />
            <circle cx="73" cy="34" r="2" fill="#fff" />
            
            {/* Glasses frame */}
            <ellipse cx="48" cy="35" rx="10" ry="11" fill="none" stroke="#000" strokeWidth="2.5" />
            <ellipse cx="72" cy="35" rx="10" ry="11" fill="none" stroke="#000" strokeWidth="2.5" />
            <line x1="58" y1="35" x2="62" y2="35" stroke="#000" strokeWidth="2.5" />
            
            {/* Smile */}
            <path d="M 48 45 Q 60 50 72 45" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            
            {/* Body/Shirt */}
            <rect x="35" y="60" width="50" height="45" fill="#000" rx="5" />
            
            {/* Neck */}
            <rect x="52" y="58" width="16" height="8" fill="#f5d7b1" />
            
            {/* Waving Hand */}
            <g transform="translate(95, 75)">
              <ellipse cx="0" cy="0" rx="8" ry="12" fill="#f5d7b1" transform="rotate(-30)" />
              <rect x="-3" y="-15" width="6" height="18" fill="#f5d7b1" transform="rotate(-25)" />
              <rect x="-2" y="-15" width="4" height="12" fill="#f5d7b1" transform="rotate(-40)" />
              <rect x="-2" y="-15" width="4" height="12" fill="#f5d7b1" transform="rotate(-10)" />
              <rect x="-2" y="-15" width="4" height="12" fill="#f5d7b1" transform="rotate(10)" />
            </g>
            
            {/* Arm */}
            <path d="M 85 70 Q 95 65 100 75" fill="none" stroke="#000" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search courses, instructors..." 
          style={styles.searchInput}
        />
      </div>

      {/* Two Column Layout */}
      <div style={styles.twoColumnLayout}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Current Course */}
          <div style={styles.currentCourse}>
            <div style={styles.currentCourseContent}>
              <div style={styles.courseIconWrapper}>
                <div style={styles.courseIcon}>🇪🇸</div>
              </div>
              <div>
                <h3 style={styles.courseTitle}>Spanish B2</h3>
                <p style={styles.courseInstructor}>by Alejandro Velazquez</p>
              </div>
            </div>
            <div style={styles.courseActions}>
              <button style={styles.iconButton}>
                <Clock size={20} />
              </button>
              <button style={styles.continueButton}>Continue</button>
              <button style={styles.iconButton}>←</button>
              <button style={styles.iconButton}>→</button>
            </div>
          </div>

          {/* Courses Section */}
          <div style={styles.coursesSection}>
            <h3 style={styles.sectionTitle}>Courses</h3>
            
            {/* Tabs */}
            <div style={styles.tabs}>
              {['All Courses', 'The Newest', 'Top Rated', 'Most Popular'].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  style={{
                    ...styles.tab,
                    ...(idx === 0 ? styles.activeTab : {})
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Course List */}
            <div style={styles.courseList}>
              {courses.map((course) => (
                <div key={course.id} style={styles.courseItem}>
                  <div style={styles.courseItemLeft}>
                    <div style={{...styles.courseItemIcon, backgroundColor: course.color}}>
                      {course.icon}
                    </div>
                    <div>
                      <h4 style={styles.courseItemTitle}>{course.title}</h4>
                      <p style={styles.courseItemInstructor}>by {course.instructor}</p>
                    </div>
                  </div>
                  <div style={styles.courseItemRight}>
                    <div style={styles.courseInfo}>
                      <Clock size={16} color="#666" />
                      <span style={styles.infoText}>{course.duration}</span>
                    </div>
                    <div style={styles.courseInfo}>
                      <Star size={16} color="#fbbf24" fill="#fbbf24" />
                      <span style={styles.infoText}>{course.rating}</span>
                    </div>
                    <button style={styles.viewButton}>View course</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>11</div>
              <div style={styles.statLabel}>Courses<br />completed</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>4</div>
              <div style={styles.statLabel}>Courses<br />in progress</div>
            </div>
          </div>

          {/* Statistics Chart */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Your statistics</h3>
              <button style={styles.weeklyButton}>Weekly ▼</button>
            </div>
            
            <div style={styles.chartTabs}>
              <button style={styles.chartTabActive}>Learning Hours</button>
              <button style={styles.chartTab}>My Courses</button>
            </div>

            {/* Chart */}
            <div style={styles.chartContainer}>
              <svg width="100%" height="180" viewBox="0 0 400 180">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="30"
                    y1={30 + (i * 25)}
                    x2="390"
                    y2={30 + (i * 25)}
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Y-axis labels */}
                {[5, 4, 3, 2, 1, 0].map((i, idx) => (
                  <text key={i} x="10" y={35 + (idx * 25)} fontSize="12" fill="#999">
                    {i}
                  </text>
                ))}
                
                {/* Line */}
                <polyline
                  points={weeklyData.map((d, i) => `${60 + (i * 55)},${155 - (d.hours / maxHours * 120)}`).join(' ')}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                />
                
                {/* Points and Labels */}
                {weeklyData.map((d, i) => (
                  <g key={i}>
                    <circle
                      cx={60 + (i * 55)}
                      cy={155 - (d.hours / maxHours * 120)}
                      r="5"
                      fill="white"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                    />
                    {d.hours > 0 && (
                      <text
                        x={60 + (i * 55)}
                        y={155 - (d.hours / maxHours * 120) - 12}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill="#333"
                      >
                        {d.hours}h
                      </text>
                    )}
                    <text
                      x={60 + (i * 55)}
                      y="175"
                      textAnchor="middle"
                      fontSize="11"
                      fill="#999"
                    >
                      {d.day}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Premium Card */}
          <div style={styles.premiumCard}>
            <div style={styles.premiumContent}>
              <div>
                <h3 style={styles.premiumTitle}>Lern even more!</h3>
                <p style={styles.premiumText}>Unlock premium features<br />only for $9.99 per month.</p>
              </div>
              <div style={styles.premiumIcon}>📚</div>
            </div>
            <button style={styles.premiumButton}>
              <TrendingUp size={16} />
              <span>Go Premium</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '30px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  welcomeSection: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  welcomeContent: {
    flex: 1
  },
  welcomeTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#1f2937'
  },
  welcomeText: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0
  },
  illustrationContainer: {
    marginLeft: '20px'
  },
  illustration: {
    display: 'block'
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '30px'
  },
  searchIcon: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  searchInput: {
    width: '100%',
    padding: '16px 20px 16px 50px',
    fontSize: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '15px',
    outline: 'none',
    backgroundColor: 'white',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  },
  twoColumnLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  currentCourse: {
    background: 'linear-gradient(135deg, #fff5e6 0%, #ffe6cc 100%)',
    borderRadius: '20px',
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  currentCourseContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  courseIconWrapper: {
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  courseIcon: {
    fontSize: '32px'
  },
  courseTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    color: '#1f2937'
  },
  courseInstructor: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  courseActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  iconButton: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.2s'
  },
  continueButton: {
    padding: '12px 30px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  coursesSection: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 25px 0',
    color: '#1f2937'
  },
  tabs: {
    display: 'flex',
    gap: '25px',
    borderBottom: '2px solid #e5e7eb',
    marginBottom: '25px'
  },
  tab: {
    padding: '12px 0',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '15px',
    fontWeight: '600',
    color: '#9ca3af',
    cursor: 'pointer',
    position: 'relative',
    transition: 'color 0.2s'
  },
  activeTab: {
    color: '#1f2937',
    borderBottom: '3px solid #000',
    marginBottom: '-2px'
  },
  courseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  courseItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    borderRadius: '15px',
    transition: 'background-color 0.2s',
    cursor: 'pointer'
  },
  courseItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flex: 1
  },
  courseItemIcon: {
    width: '55px',
    height: '55px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
  },
  courseItemTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    color: '#1f2937'
  },
  courseItemInstructor: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0
  },
  courseItemRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  courseInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  infoText: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  viewButton: {
    padding: '10px 25px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  statNumber: {
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '13px',
    color: '#6b7280',
    lineHeight: '1.4'
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  chartHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  chartTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    color: '#1f2937'
  },
  weeklyButton: {
    padding: '8px 15px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '13px',
    color: '#6b7280',
    cursor: 'pointer'
  },
  chartTabs: {
    display: 'flex',
    gap: '5px',
    marginBottom: '20px'
  },
  chartTabActive: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
    cursor: 'pointer',
    borderBottom: '2px solid #000'
  },
  chartTab: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    color: '#9ca3af',
    cursor: 'pointer'
  },
  chartContainer: {
    width: '100%',
    marginTop: '15px'
  },
  premiumCard: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  premiumContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  premiumTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#1f2937'
  },
  premiumText: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.5'
  },
  premiumIcon: {
    fontSize: '40px'
  },
  premiumButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  }
};