"use client";

import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const observed = new WeakSet<HTMLElement>();

    const observeElement = (
      observer: IntersectionObserver,
      element: HTMLElement
    ) => {
      if (observed.has(element) || element.classList.contains("is-visible")) {
        return;
      }

      observed.add(element);
      observer.observe(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const delay = element.getAttribute("data-delay");

          if (delay) {
            element.style.transitionDelay = `${delay}ms`;
          }

          element.classList.add("is-visible");
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    const scan = (root: ParentNode) => {
      const elements = Array.from(
        root.querySelectorAll<HTMLElement>("[data-reveal]")
      );

      elements.forEach((element) => observeElement(observer, element));
    };

    scan(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.matches("[data-reveal]")) {
            observeElement(observer, node);
          }

          scan(node);
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}