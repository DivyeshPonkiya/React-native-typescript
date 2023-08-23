import {MutableRefObject, RefObject} from 'react';

interface NavigationRefType {
  navigate(...props: any[]): void;
  reset(name: string): void;
  replace(...props: any[]): void;
  goBack(): void;
  canGoBack(): boolean;
}

export const navigationRef: MutableRefObject<NavigationRefType | null> = {
  current: null,
};

export const currentScreen: MutableRefObject<string | null> = {current: null};

export function navigate(...props: any[]): void {
  navigationRef.current?.navigate(...props);
}

export function reset(routesObject: {name: string}): void {
  navigationRef.current?.reset({
    routes: [
      {
        name: routesObject.name,
      },
    ],
  });
}

export function replace(...props: any[]): void {
  navigationRef.current?.replace(...props);
}

export function goBack(): void {
  navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}
