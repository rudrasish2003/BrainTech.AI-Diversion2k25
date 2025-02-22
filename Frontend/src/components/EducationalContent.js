import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  BrainCircuit, 
  ChevronDown, 
  ChevronUp, 
  BookOpen,
  Brain, 
  AlertCircle, 
  Activity, 
  Clock, 
  Pill,
} from 'lucide-react';

const EducationalContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState('overview');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      id: 'overview',
      title: 'Understanding Alzheimer\'s Disease',
      icon: Brain,
      content: [
        {
          subtitle: 'What is Alzheimer\'s Disease?',
          text: 'Alzheimer\'s disease is a progressive neurological disorder that causes brain cells to die and the brain to shrink (atrophy). It\'s the most common cause of dementia, accounting for 60-80% of cases. The disease leads to a continuous decline in thinking, behavioral, and social skills, affecting a person\'s ability to function independently.'
        },
        {
          subtitle: 'How it Affects the Brain',
          text: 'The disease primarily impacts areas of the brain involved in memory, including the entorhinal cortex and hippocampus. It later affects areas responsible for language, reasoning, and social behavior. Two abnormal structures - plaques and tangles - are considered hallmarks of the disease.'
        },
        {
          subtitle: 'Risk Factors',
          text: 'Key risk factors include: Age (primarily 65+), Family history, Genetics (APOE-e4 gene), Cardiovascular health, Head trauma, Poor sleep patterns, and Lifestyle factors such as physical activity and diet.'
        }
      ]
    },
    {
      id: 'stages',
      title: 'Stages of Alzheimer\'s',
      icon: Clock,
      content: [
        {
          subtitle: 'Preclinical Stage',
          text: 'Changes begin in the brain years before symptoms appear. This stage can last for years or decades with no outward signs.'
        },
        {
          subtitle: 'Mild Cognitive Impairment (MCI)',
          text: 'Subtle changes in memory and thinking abilities become noticeable but don\'t significantly impact daily life.'
        },
        {
          subtitle: 'Mild Dementia',
          text: 'Memory and thinking problems become more apparent, affecting work and social life. Common issues include getting lost, trouble handling money, and repeating questions.'
        },
        {
          subtitle: 'Moderate Dementia',
          text: 'Increased confusion and memory loss, difficulty recognizing family and friends, impaired judgment, and behavioral changes.'
        },
        {
          subtitle: 'Severe Dementia',
          text: 'Complete dependence on others for care. Loss of awareness of recent experiences and surroundings, changes in physical abilities including walking, sitting, and swallowing.'
        }
      ]
    },
    {
      id: 'symptoms',
      title: 'Signs and Symptoms',
      icon: AlertCircle,
      content: [
        {
          subtitle: 'Memory Loss',
          text: 'Forgetting recently learned information, important dates or events, asking the same questions repeatedly, increasingly relying on memory aids.'
        },
        {
          subtitle: 'Planning and Problem Solving',
          text: 'Difficulty developing and following plans, working with numbers, following familiar recipes, or tracking monthly bills.'
        },
        {
          subtitle: 'Daily Tasks',
          text: 'Trouble completing familiar tasks at home, work, or leisure. May have difficulty driving to a familiar location or organizing a grocery list.'
        },
        {
          subtitle: 'Time and Place',
          text: 'Losing track of dates, seasons, and time passage. May forget where they are or how they got there.'
        },
        {
          subtitle: 'Visual Images',
          text: 'Vision problems, difficulty reading, judging distance, determining color or contrast, which may cause problems with driving.'
        },
        {
          subtitle: 'Speaking and Writing',
          text: 'Trouble following or joining conversations, stopping mid-conversation, repeating themselves, struggling with vocabulary.'
        },
        {
          subtitle: 'Misplacing Things',
          text: 'Putting things in unusual places, losing ability to retrace steps, possibly accusing others of stealing.'
        },
        {
          subtitle: 'Judgment',
          text: 'Decreased or poor judgment with money, grooming, and decision-making.'
        },
        {
          subtitle: 'Social Withdrawal',
          text: 'Withdrawing from work, hobbies, social activities, and family events.'
        },
        {
          subtitle: 'Mood Changes',
          text: 'Personality and mood changes, including confusion, suspicion, depression, anxiety, and agitation.'
        }
      ]
    },
    {
      id: 'treatment',
      title: 'Treatment and Care',
      icon: Pill,
      content: [
        {
          subtitle: 'Medications',
          text: 'Current FDA-approved medications can temporarily slow the worsening of symptoms. These include cholinesterase inhibitors (Aricept, Exelon, Razadyne) and memantine (Namenda).'
        },
        {
          subtitle: 'Non-drug Approaches',
          text: 'Various therapies and interventions including cognitive stimulation, reminiscence therapy, and behavioral management can help manage symptoms.'
        },
        {
          subtitle: 'Lifestyle Modifications',
          text: 'Regular exercise, social engagement, cognitive stimulation, proper nutrition, and good sleep habits can help manage the condition.'
        },
        {
          subtitle: 'Caregiving',
          text: 'Creating a safe environment, establishing routines, providing assistance with daily activities, and ensuring proper medical care are essential aspects of caregiving.'
        }
      ]
    }
  ];

  const styles = {
    gradientText: {
      background: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent'
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
    },
    heroSection: {
      background: 'linear-gradient(135deg, #1a365d 0%, #2563eb 100%)',
      position: 'relative',
      overflow: 'hidden'
    },
    heroPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 20%, rgba(62, 184, 255, 0.1) 0%, transparent 50%)',
      zIndex: 1
    },
    fadeIn: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      marginTop: '1rem',
      marginBottom: '1rem'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%)',
      color: 'white',
      padding: '1rem',
      textAlign: 'left',
      fontWeight: 'bold',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px'
    },
    tableCell: {
      padding: '1rem',
      borderBottom: '1px solid #E5E7EB',
      background: 'white'
    },
    section: {
      background: 'white',
      borderRadius: '16px',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease-in-out',
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      opacity: isVisible ? 1 : 0
    },
    sectionHeader: {
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%)',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    sectionContent: {
      padding: '2rem',
      background: 'white'
    },
    contentBlock: {
      marginBottom: '2rem'
    },
    subtitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1E40AF',
      marginBottom: '0.75rem'
    },
    text: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#4B5563'
    },
    infoCard: {
      background: 'rgba(30, 64, 175, 0.05)',
      borderRadius: '8px',
      padding: '1.5rem',
      marginTop: '2rem'
    },
    infoCardTitle: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#1E40AF',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  };

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Neuroimaging AI for Early Alzheimer\'s Detection',
        text: 'Cutting-edge multimodal deep learning analysis using advanced 3D convolutional networks and comprehensive longitudinal datasets',
        url: window.location.href
      }).catch(console.error);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F0F7FF 0%, #FFFFFF 100%)'
    }}>
      {/* Hero Section */}
      <div style={{
        ...styles.heroSection,
        padding: '6rem 2rem',
        color: 'white'
      }}>
        <div style={styles.heroPattern} />
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          ...styles.fadeIn
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <BrainCircuit style={{
              width: '48px',
              height: '48px',
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))'
            }} />
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              lineHeight: '1.2',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Neuroimaging AI for Early Alzheimer's Detection
            </h1>
          </div>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '800px',
            lineHeight: '1.6'
          }}>
            Cutting-edge multimodal deep learning analysis using advanced 3D convolutional networks
            and comprehensive longitudinal datasets
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { value: '94.1%', label: 'Classification Accuracy', subtext: 'Validated on ADNI dataset' },
            { value: '0.97 AUC', label: 'MCI Conversion Prediction', subtext: 'Early detection rate' },
            { value: '6-12 Mo', label: 'Earlier Diagnosis', subtext: 'Compared to traditional methods' }
          ].map((metric, index) => (
            <div key={index} style={{
              ...styles.glassCard,
              padding: '2rem',
              textAlign: 'center',
              transform: `translateY(${isVisible ? '0' : '20px'})`,
              opacity: isVisible ? 1 : 0,
              transition: `all 0.6s ease-out ${index * 0.2}s`
            }}>
              <div style={{
                ...styles.gradientText,
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {metric.value}
              </div>
              <div style={{
                color: '#4B5563',
                fontSize: '1rem',
                fontWeight: 'bold',
                marginBottom: '0.25rem'
              }}>
                {metric.label}
              </div>
              <div style={{
                color: '#6B7280',
                fontSize: '0.875rem'
              }}>
                {metric.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alzheimer's Information Sections */}
      <div style={{
        maxWidth: '1280px',
        margin: '2rem auto',
        padding: '0 2rem'
      }}>
        {sections.map((section, index) => (
          <div 
            key={section.id}
            style={{
              ...styles.section,
              transition: `all 0.6s ease-out ${index * 0.1}s`
            }}
          >
            <div 
              style={styles.sectionHeader}
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <div style={styles.sectionTitle}>
                <section.icon size={24} />
                {section.title}
              </div>
              {expandedSection === section.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            {expandedSection === section.id && (
              <div style={styles.sectionContent}>
                {section.content.map((block, blockIndex) => (
                  <div key={blockIndex} style={styles.contentBlock}>
                    <h3 style={styles.subtitle}>{block.subtitle}</h3>
                    <p style={styles.text}>{block.text}</p>
                  </div>
                ))}
                
                {section.id === 'overview' && (
                  <div style={styles.infoCard}>
                    <div style={styles.infoCardTitle}>
                      <Activity size={20} />
                      Global Impact Statistics (2023)
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ marginBottom: '0.5rem', color: '#4B5563' }}>
                        • Over 55 million people worldwide living with dementia
                      </li>
                      <li style={{ marginBottom: '0.5rem', color: '#4B5563' }}>
                        • New case of dementia every 3 seconds globally
                      </li>
                      <li style={{ marginBottom: '0.5rem', color: '#4B5563' }}>
                        • Expected to reach 78 million by 2030
                      </li>
                      <li style={{ color: '#4B5563' }}>
                        • Annual global cost exceeds $1 trillion USD
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Global Statistics */}
        <div style={{
          ...styles.glassCard,
          padding: '2rem',
          marginTop: '2rem'
        }}>
          <h2 style={{
            ...styles.gradientText,
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}>
            Global Alzheimer's Statistics (2023)
          </h2>
          <div style={{
            overflowX: 'auto'
          }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Region</th>
                  <th style={styles.tableHeader}>Cases (Millions)</th>
                  <th style={styles.tableHeader}>% of Population</th>
                  <th style={styles.tableHeader}>Annual Cost (USD)</th>
                  <th style={styles.tableHeader}>Growth Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>North America</td>
                  <td style={styles.tableCell}>6.2</td>
                  <td style={styles.tableCell}>10.8%</td>
                  <td style={styles.tableCell}>345B</td>
                  <td style={styles.tableCell}>+2.8%</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Europe</td>
                  <td style={styles.tableCell}>8.5</td>
                  <td style={styles.tableCell}>9.6%</td>
                  <td style={styles.tableCell}>290B</td>
                  <td style={styles.tableCell}>+2.4%</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Asia Pacific</td>
                  <td style={styles.tableCell}>16.8</td>
                  <td style={styles.tableCell}>4.2%</td>
                  <td style={styles.tableCell}>260B</td>
                  <td style={styles.tableCell}>+3.6%</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Latin America</td>
                  <td style={styles.tableCell}>3.4</td>
                  <td style={styles.tableCell}>6.3%</td>
                  <td style={styles.tableCell}>105B</td>
                  <td style={styles.tableCell}>+3.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Research Performance Metrics */}
        <div style={{
          ...styles.glassCard,
          padding: '2rem',
          marginTop: '2rem'
        }}>
          <h2 style={{
            ...styles.gradientText,
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}>
            Research Performance Metrics
          </h2>
          <div style={{
            overflowX: 'auto'
          }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Model Architecture</th>
                  <th style={styles.tableHeader}>Accuracy</th>
                  <th style={styles.tableHeader}>Sensitivity</th>
                  <th style={styles.tableHeader}>Specificity</th>
                  <th style={styles.tableHeader}>F1 Score</th>
                  <th style={styles.tableHeader}>AUC-ROC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>3D-CNN (Proposed)</td>
                  <td style={styles.tableCell}>94.1%</td>
                  <td style={styles.tableCell}>92.8%</td>
                  <td style={styles.tableCell}>95.3%</td>
                  <td style={styles.tableCell}>93.5%</td>
                  <td style={styles.tableCell}>0.97</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>ResNet-50 3D</td>
                  <td style={styles.tableCell}>91.2%</td>
                  <td style={styles.tableCell}>89.7%</td>
                  <td style={styles.tableCell}>92.6%</td>
                  <td style={styles.tableCell}>90.6%</td>
                  <td style={styles.tableCell}>0.94</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>DenseNet-121 3D</td>
                  <td style={styles.tableCell}>90.8%</td>
                  <td style={styles.tableCell}>88.9%</td>
                  <td style={styles.tableCell}>92.1%</td>
                  <td style={styles.tableCell}>89.8%</td>
                  <td style={styles.tableCell}>0.93</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>VGG-16 3D</td>
                  <td style={styles.tableCell}>88.5%</td>
                  <td style={styles.tableCell}>86.2%</td>
                  <td style={styles.tableCell}>90.4%</td>
                  <td style={styles.tableCell}>87.9%</td>
                  <td style={styles.tableCell}>0.91</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dataset Characteristics */}
        <div style={{
          ...styles.glassCard,
          padding: '2rem',
          marginTop: '2rem'
        }}>
          <h2 style={{
            ...styles.gradientText,
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}>
            Dataset Characteristics
          </h2>
          <div style={{
            overflowX: 'auto'
          }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Dataset</th>
                  <th style={styles.tableHeader}>Total Subjects</th>
                  <th style={styles.tableHeader}>AD Patients</th>
                  <th style={styles.tableHeader}>MCI Cases</th>
                  <th style={styles.tableHeader}>Controls</th>
                  <th style={styles.tableHeader}>Follow-up Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>ADNI-1</td>
                  <td style={styles.tableCell}>843</td>
                  <td style={styles.tableCell}>210</td>
                  <td style={styles.tableCell}>408</td>
                  <td style={styles.tableCell}>225</td>
                  <td style={styles.tableCell}>36 months</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>ADNI-2</td>
                  <td style={styles.tableCell}>782</td>
                  <td style={styles.tableCell}>178</td>
                  <td style={styles.tableCell}>389</td>
                  <td style={styles.tableCell}>215</td>
                  <td style={styles.tableCell}>24 months</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>OASIS-3</td>
                  <td style={styles.tableCell}>1098</td>
                  <td style={styles.tableCell}>145</td>
                  <td style={styles.tableCell}>421</td>
                  <td style={styles.tableCell}>532</td>
                  <td style={styles.tableCell}>30 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          ...styles.glassCard,
          background: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%)',
          color: 'white',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              Contribute to Alzheimer's Research
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '2rem'
            }}>
              Access our preprocessed datasets and models on NeuroVault
            </p>
            <code style={{
              background: 'rgba(0,0,0,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
              DOI:10.1109/ACCESS.2023.3294981
            </code>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '2rem'
            }}>
              <button
                onClick={shareContent}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  background: 'white',
                  color: '#1E40AF',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out'
                }}
              >
                <Share2 style={{ marginRight: '0.5rem' }} />
                Share Research
              </button>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  border: '2px solid white',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out'
                }}
              >
                <BookOpen style={{ marginRight: '0.5rem' }} />
                Read Full Paper
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalContent;