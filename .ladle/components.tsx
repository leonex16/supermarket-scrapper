import type { GlobalProvider } from '@ladle/react';
import '../Application/styles/globals.scss';

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const lastIndex = globalState.story.lastIndexOf('--');
  const componentName = globalState.story.substring(lastIndex + 2)
  const title = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  
  return (
    <main>
      <header>
        <h1>{title}</h1>
      </header>
      <article>
        {children}
      </article>
    </main>
  );
};
