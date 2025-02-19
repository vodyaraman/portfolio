import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

gsap.registerPlugin(TextPlugin);

const TRANSLATIONS: Record<string, string> = {
    'Professional qualities': 'Профессиональные качества',
    'Social skills': 'Социальные навыки',
    'Additional information': 'Дополнительная информация',
    'Commitment to continuous professional growth': 'Стремление к постоянному профессиональному росту',
    'Interest in modern web development technologies': 'Заинтересованность в современных технологиях веб-разработки',
    'Quick adaptation to new methodologies, frameworks, libraries': 'Быстрая адаптация к новым методологиям, фреймворкам, библиотекам',
    'Effective teamwork, politeness, friendliness': 'Эффективная работа в команде, вежливость, дружелюбие',
    'Extremely high speed of learning new material': 'Крайне высокая скорость освоения нового материала',
    'Responsibility, attention to quality, time management': 'Ответственность, внимание к качеству, тайм-менеджмент',
    'Fully remote work': 'Полностью удалённая работа',
    'Ready to work 60+ hours per week': 'Готов работать от 60 часов в неделю',
    'Interest in application development in any programming languages': 'Интерес к разработке приложений на любых языках программирования',
    'Expected salary from 60k RUB initially': 'Ожидаемая зарплата от 60 тыс. рублей на старте',
    'English:': 'Английский:',
    'Prague Language Institute, 2019': 'Пражский языковой институт, 2019'
};

type TextTranslatorProps = {
    className?: string;
    content: string;
};

export const TextTranslator = ({ className, content }: TextTranslatorProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationInstances = useRef<gsap.core.Timeline[]>([]);
    const isAnimating = useRef(false);

    const generateCyrillicDummy = (text: string): string => {
        const chars = 'abekmhopctx';
        return text.split('').map((char, index) => {
            if (char === ' ' || char === '\t' || char === '\n') return char;
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            return index === 0 ? randomChar.toUpperCase() : randomChar;
        }).join('');
    };

    const playAnimation = (isEnter: boolean) => {
        if (!containerRef.current || isAnimating.current) return;
        isAnimating.current = true;

        const elements = containerRef.current.querySelectorAll<HTMLElement>(
            '.profile-content h2, .profile-content li:not(strong li)'
        );

        animationInstances.current.forEach(tl => tl.kill());
        animationInstances.current = [];

        elements.forEach(el => {
            const originalText = el.dataset.originalText || el.textContent?.trim() || '';
            if (!el.dataset.originalText) el.dataset.originalText = originalText;

            const targetText = isEnter
                ? TRANSLATIONS[originalText] || originalText
                : originalText;

            if (targetText === originalText && isEnter) return;

            const timeline = gsap.timeline();
            animationInstances.current.push(timeline);

            timeline.to(el, {
                duration: 0.15,
                text: generateCyrillicDummy(el.textContent || ''),
                repeat: 2,
                ease: "power2.inOut",
                onRepeat: () => {
                    el.textContent = generateCyrillicDummy(el.textContent || '');
                }
            }).to(el, {
                text: targetText,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    isAnimating.current = false;
                }
            });
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseEnter = () => playAnimation(true);
        const handleMouseLeave = () => playAnimation(false);

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.style.cursor = 'pointer';

        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            animationInstances.current.forEach(tl => tl.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className={`profile-content ${className || ''}`}>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    h2: ({ node, ...props }) => (
                        <h2 className="profile-content__heading" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="profile-content__item" {...props} />
                    )
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
