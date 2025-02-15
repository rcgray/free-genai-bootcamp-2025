// Format date to a readable string
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

// Format percentage
export const formatPercentage = (value: number, total: number): string => {
    if (total === 0) return '0%';
    return `${Math.round((value / total) * 100)}%`;
};

// Format score (correct/total)
export const formatScore = (correct: number, total: number): string => {
    return `${correct}/${total} (${formatPercentage(correct, total)})`;
};

// Format study time duration
export const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
        return `${minutes} min${minutes === 1 ? '' : 's'}`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr${hours === 1 ? '' : 's'}${remainingMinutes ? ` ${remainingMinutes} min${remainingMinutes === 1 ? '' : 's'}` : ''
        }`;
};
