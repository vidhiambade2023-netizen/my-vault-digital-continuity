import React, { useState } from 'react';
import './wireframe.css';
import { Screen01SignIn } from './screens/Screen01SignIn';
import { Screen02TwoFactor } from './screens/Screen02TwoFactor';
import { Screen03Dashboard } from './screens/Screen03Dashboard';
import { Screen04DiscoverServices } from './screens/Screen04DiscoverServices';
import { Screen05ServicePermissions } from './screens/Screen05ServicePermissions';
import { Screen06Groups } from './screens/Screen06Groups';
import { Screen07AddNominee } from './screens/Screen07AddNominee';
import { Screen08AssignAccess } from './screens/Screen08AssignAccess';
import { Screen09ContinuityPlan } from './screens/Screen09ContinuityPlan';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [nomineeData, setNomineeData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    relationship: 'Sibling / Next of Kin'
  });

  const screens = [
    { num: 1, title: '01 Sign In', label: 'Sign In' },
    { num: 2, title: '02 2FA', label: 'Two-Factor Auth' },
    { num: 3, title: '03 Dashboard', label: 'Dashboard' },
    { num: 4, title: '04 Discover', label: 'Discover Services' },
    { num: 5, title: '05 Permissions', label: 'Service Permissions' },
    { num: 6, title: '06 Groups', label: 'Service Groups' },
    { num: 7, title: '07 Add Nominee', label: 'Add Nominee' },
    { num: 8, title: '08 Assign Access', label: 'Assign & Review' },
    { num: 9, title: '09 Continuity Plan', label: 'Continuity Plan' }
  ];

  const goToNext = () => {
    if (currentScreen < 9) {
      setCurrentScreen(currentScreen + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPrev = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToScreen = (num: number) => {
    setCurrentScreen(num);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--wf-bg-canvas)' }}>
      {/* Top Wireframe Navigation & Screen Switcher Bar */}
      <div className="wf-toolbar">
        <div className="wf-toolbar-title">
          <span style={{
            backgroundColor: '#374151',
            padding: '2px 6px',
            borderRadius: '3px',
            fontSize: '11px',
            fontFamily: 'var(--wf-font-mono)'
          }}>
            UEDP-5 PRE-TESTING
          </span>
          <span>My Vault • Low-Fidelity Wireframes</span>
        </div>

        {/* 9 Screen Switcher Pills */}
        <div className="wf-stepper-pills">
          {screens.map(s => (
            <button
              key={s.num}
              onClick={() => goToScreen(s.num)}
              className={`wf-pill ${currentScreen === s.num ? 'active' : ''}`}
              title={`Switch to Screen ${s.num}: ${s.label}`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Toolbar Controls */}
        <div className="wf-nav-buttons">
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className="wf-control-btn"
            style={{ fontSize: '11.5px', background: showAnnotations ? '#374151' : '#1F2937' }}
            title="Toggle UX Design Annotations"
          >
            {showAnnotations ? '💡 Annotations ON' : '💡 Annotations OFF'}
          </button>

          <button
            onClick={goToPrev}
            disabled={currentScreen === 1}
            className="wf-control-btn"
            style={{ opacity: currentScreen === 1 ? 0.4 : 1 }}
          >
            ← Prev
          </button>

          <button
            onClick={goToNext}
            disabled={currentScreen === 9}
            className="wf-control-btn primary"
            style={{ opacity: currentScreen === 9 ? 0.4 : 1 }}
          >
            Next →
          </button>

          <button
            onClick={() => goToScreen(1)}
            className="wf-control-btn"
            title="Restart flow at Screen 01"
          >
            ↺
          </button>
        </div>
      </div>

      {/* 1440x900 Artboard Presentation Area */}
      <div className="wf-artboard-wrapper">
        <div className="wf-artboard">
          {currentScreen === 1 && (
            <Screen01SignIn
              onNext={goToNext}
              showAnnotations={showAnnotations}
            />
          )}

          {currentScreen === 2 && (
            <Screen02TwoFactor
              onNext={goToNext}
              onPrev={goToPrev}
              showAnnotations={showAnnotations}
            />
          )}

          {currentScreen === 3 && (
            <Screen03Dashboard
              onNext={goToNext}
              onNavigateScreen={goToScreen}
              showAnnotations={showAnnotations}
            />
          )}

          {currentScreen === 4 && (
            <Screen04DiscoverServices
              onNext={goToNext}
              onPrev={goToPrev}
              onSelectGoogle={() => goToScreen(5)}
              showAnnotations={showAnnotations}
            />
          )}

          {currentScreen === 5 && (
            <Screen05ServicePermissions
              onNext={() => goToScreen(6)}
              onPrev={goToPrev}
              showAnnotations={showAnnotations}
            />
          )}

          {currentScreen === 6 && (
            <Screen06Groups
              onNext={() => goToScreen(7)}
              onPrev={goToPrev}
              showAnnotations={showAnnotations}
            />
          )}

          {currentScreen === 7 && (
            <Screen07AddNominee
              onNext={(data) => {
                setNomineeData(data);
                goToScreen(8);
              }}
              onPrev={goToPrev}
              showAnnotations={showAnnotations}
            />
          )}

          {currentScreen === 8 && (
            <Screen08AssignAccess
              nomineeData={nomineeData}
              onNext={() => goToScreen(9)}
              onPrev={goToPrev}
              showAnnotations={showAnnotations}
            />
          )}

          {currentScreen === 9 && (
            <Screen09ContinuityPlan
              onRestart={() => goToScreen(1)}
              onPrev={goToPrev}
              showAnnotations={showAnnotations}
            />
          )}
        </div>
      </div>
    </div>
  );
};

