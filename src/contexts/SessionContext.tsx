import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Generate a unique session ID using UUID v4 format
function generateSessionId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

interface SessionContextType {
    sessionId: string;
    startNewSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
    children: ReactNode;
    moduleId: number;
}

export function SessionProvider({ children, moduleId }: SessionProviderProps) {
    const [sessionId, setSessionId] = useState<string>(() => {
        // Try to get existing session from localStorage for this module
        const storageKey = `module_${moduleId}_session`;
        const stored = localStorage.getItem(storageKey);
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
        // Generate new session if none exists
        const newId = generateSessionId();
        localStorage.setItem(storageKey, newId);
        return newId;
    });

    // Update session ID when module changes
    useEffect(() => {
        const storageKey = `module_${moduleId}_session`;
        const stored = localStorage.getItem(storageKey);
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
            localStorage.setItem(storageKey, newId);
            setSessionId(newId);
        }
    }, [moduleId]);

    const startNewSession = () => {
        const storageKey = `module_${moduleId}_session`;
        const newId = generateSessionId();
        localStorage.setItem(storageKey, newId);
        setSessionId(newId);
    };

    return (
        <SessionContext.Provider value={{ sessionId, startNewSession }}>
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
