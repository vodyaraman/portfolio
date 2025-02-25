const achievementTree = [
    {
      id: "frontend",
      title: "Frontend",
      children: [
        {
          id: "html_css",
          title: "HTML & CSS",
          children: [
            { id: "html5", title: "HTML5", desc: "Создание разметки для веб-страниц" },
            { id: "xml", title: "XML", desc: "Форматирование данных для хранения и передачи" },
            { id: "css3", title: "CSS3", desc: "Стилизация веб-страниц" },
            { id: "scss", title: "SCSS (SASS)", desc: "Оптимизация и модульность стилей" },
            { id: "responsive", title: "Адаптивная вёрстка", desc: "Создание интерфейсов для разных экранов" },
            { id: "cross_browser", title: "Кроссбраузерная вёрстка", desc: "Обеспечение совместимости в браузерах" },
            { id: "figma", title: "Макетирование в Figma", desc: "Работа с макетами UI/UX" }
          ]
        },
        {
          id: "js_ts",
          title: "JavaScript & TypeScript",
          children: [
            { id: "javascript", title: "JavaScript", desc: "Разработка клиентской логики" },
            { id: "typescript", title: "TypeScript", desc: "Использование строгой типизации" },
            { id: "animations", title: "Создание анимаций", desc: "Работа с динамическими эффектами" },
            { id: "optimization", title: "Оптимизация компонентов", desc: "Улучшение производительности React-компонентов" }
          ]
        },
        {
          id: "frameworks",
          title: "Frontend Frameworks",
          children: [
            {
              id: "react",
              title: "React Ecosystem",
              children: [
                { id: "react_core", title: "React", desc: "Разработка компонентов и состояний" },
                { id: "redux", title: "React Redux", desc: "Глобальное управление состоянием" },
                { id: "astro", title: "Astro.js", desc: "Генерация статических сайтов" },
                { id: "nextjs", title: "Next.js", desc: "Серверный рендеринг и маршрутизация" },
                { id: "react_native_expo", title: "React Native Expo", desc: "Разработка мобильных приложений" },
                {
                  id: "react_libraries",
                  title: "React Libraries",
                  children: [
                    { id: "mui", title: "Material-UI (MUI)", desc: "Готовые UI-компоненты" },
                    { id: "chakra", title: "Chakra UI", desc: "Гибкие UI-компоненты" },
                    { id: "antd", title: "Ant Design", desc: "Компоненты для бизнес-приложений" },
                    { id: "styled", title: "Styled Components", desc: "CSS-in-JS стилизация" },
                    { id: "emotion", title: "Emotion", desc: "Продвинутая CSS-in-JS библиотека" },
                    { id: "framer", title: "Framer Motion", desc: "Анимации в React" },
                    { id: "react_query", title: "React Query", desc: "Запросы к API с кэшированием" },
                    { id: "zustand", title: "Zustand", desc: "Лёгкий state-менеджер" },
                    { id: "tanstack_table", title: "TanStack Table", desc: "Управление таблицами в React" },
                    { id: "three", title: "Three.js", desc: "Создание 3D-графики" },
                    { id: "three_fiber", title: "@react-three/fiber", desc: "React-обертка для Three.js" },
                    { id: "gsap", title: "GSAP", desc: "Продвинутые анимации" },
                    { id: "lenis", title: "Lenis", desc: "Плавный скроллинг" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "backend",
      title: "Backend",
      children: [
        {
          id: "languages",
          title: "Backend Languages",
          children: [
            { id: "js", title: "JavaScript", desc: "Серверная логика" },
            { id: "ts", title: "TypeScript", desc: "Безопасный бэкенд-код" },
            { id: "python", title: "Python", desc: "Скрипты и API" },
            { id: "csharp", title: "C#", desc: "Разработка серверных приложений" }
          ]
        }
      ]
    },
    {
      id: "tools",
      title: "Инструменты разработки",
      children: [
        { id: "docker", title: "Docker (Docker Compose)", desc: "Контейнеризация приложений" },
        { id: "git", title: "Git (GitHub, GitLens)", desc: "Контроль версий" },
        { id: "prompt_building", title: "Промтбилдинг (ChatGPT, Gemini)", desc: "Разработка промтов" },
        { id: "colab", title: "Google Colab (Jupyter Notebook)", desc: "Запуск Python-скриптов" },
        { id: "pyrus", title: "Pyrus", desc: "Организация задач и процессов" },
        { id: "notion", title: "Notion", desc: "Документирование проектов" },
        {
          id: "integrations",
          title: "Интеграции",
          children: [
            { id: "bot_api_discord", title: "BOT API Discord", desc: "Разработка ботов для Discord" },
            { id: "telegram", title: "Telegram API", desc: "Создание ботов и интеграций" },
            { id: "yandex_storage", title: "Yandex Object Storage", desc: "Работа с облачным хранилищем" }
          ]
        }
      ]
    }
  ];
  