import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Generate a unique session ID using UUID v4 format
function generateSessionId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export type StudyConsent = 'in' | 'out' | null;

interface SessionContextType {
    sessionId: string;
    startNewSession: () => void;
    studyConsent: StudyConsent;
    setStudyConsent: (consent: Exclude<StudyConsent, null>) => void;
    clearModuleStoredData: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
    children: ReactNode;
    moduleId: number;
}

export function SessionProvider({ children, moduleId }: SessionProviderProps) {
    const [sessionId, setSessionId] = useState<string>(() => {
        const storageKey = `module_${moduleId}_session`;
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
            try {
                // Handle cases where session was stored as a JSON object (e.g., from previous versions)
                const parsed = JSON.parse(stored);
                return typeof parsed === 'object' && parsed !== null && parsed.id ? parsed.id : stored;
            } catch {
                // Not JSON, return as is
                return stored;
            }
        }
        const newId = generateSessionId();
        try {
            localStorage.removeItem(storageKey);
        } catch {
        }
        sessionStorage.setItem(storageKey, newId);
        return newId;
    });

    const [studyConsent, setStudyConsentState] = useState<StudyConsent>(() => {
        const storageKey = `module_${moduleId}_study_consent`;
        const storedFromSession = sessionStorage.getItem(storageKey);
        if (storedFromSession === 'in' || storedFromSession === 'out') return storedFromSession;
        const storedFromLocal = localStorage.getItem(storageKey);
        if (storedFromLocal === 'in' || storedFromLocal === 'out') {
            try {
                localStorage.removeItem(storageKey);
            } catch {
            }
            sessionStorage.setItem(storageKey, storedFromLocal);
            return storedFromLocal;
        }
        return null;
    });

    // Update session ID when module changes
    useEffect(() => {
        const storageKey = `module_${moduleId}_session`;
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                const id = typeof parsed === 'object' && parsed !== null && parsed.id ? parsed.id : stored;
                setSessionId(id);
            } catch {
                setSessionId(stored);
            }
        } else {
            const newId = generateSessionId();
            try {
                localStorage.removeItem(storageKey);
            } catch {
            }
            sessionStorage.setItem(storageKey, newId);
            setSessionId(newId);
        }
    }, [moduleId]);

    useEffect(() => {
        const storageKey = `module_${moduleId}_study_consent`;
        const storedFromSession = sessionStorage.getItem(storageKey);
        if (storedFromSession === 'in' || storedFromSession === 'out') {
            setStudyConsentState(storedFromSession);
            return;
        }
        const storedFromLocal = localStorage.getItem(storageKey);
        if (storedFromLocal === 'in' || storedFromLocal === 'out') {
            try {
                localStorage.removeItem(storageKey);
            } catch {
            }
            sessionStorage.setItem(storageKey, storedFromLocal);
            setStudyConsentState(storedFromLocal);
            return;
        }
        setStudyConsentState(null);
    }, [moduleId]);

    const startNewSession = () => {
        const storageKey = `module_${moduleId}_session`;
        const newId = generateSessionId();
        sessionStorage.setItem(storageKey, newId);
        setSessionId(newId);
    };

    const setStudyConsent = (consent: Exclude<StudyConsent, null>) => {
        const storageKey = `module_${moduleId}_study_consent`;
        try {
            localStorage.removeItem(storageKey);
        } catch {
        }
        sessionStorage.setItem(storageKey, consent);
        setStudyConsentState(consent);
    };

    const clearModuleStoredData = () => {
        try {
            const prefixes = [
                `reflection:${sessionId}:${moduleId}:`,
                `poll:${sessionId}:${moduleId}:`,
                `pollSelection:${sessionId}:${moduleId}:`,
                `numeric-prediction:${sessionId}:${moduleId}:`,
            ];
            const storages: Storage[] = [sessionStorage, localStorage];
            for (const storage of storages) {
                for (let i = storage.length - 1; i >= 0; i--) {
                    const key = storage.key(i);
                    if (!key) continue;
                    if (prefixes.some(prefix => key.startsWith(prefix))) {
                        storage.removeItem(key);
                    }
                }
            }
        } catch {
        }
        startNewSession();
    };

    return (
        <SessionContext.Provider value={{ sessionId, startNewSession, studyConsent, setStudyConsent, clearModuleStoredData }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession(): SessionContextType {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
