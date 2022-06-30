// Copyright 2021-2022 the Deno authors. All rights reserved. MIT license.

/** @jsx runtime.h */
/** @jsxFrag runtime.Fragment */
import { tw } from "./deps.ts";
import { getIndex } from "./doc.ts";
import { runtime, services } from "./services.ts";
import { style } from "./styles.ts";
import { type Child, take } from "./utils.ts";
import * as Icons from "@/components/Icons.tsx";
import { ModuleIndexWithDoc } from "./module_path_index.tsx";

export function findItems(
  path: string,
  index: Record<string, string[]>,
): [folders: string[], modules: string[]] {
  let modules: string[] = [];
  const folders: string[] = [];
  for (const [key, value] of Object.entries(index)) {
    if (key === path) {
      modules = value;
    } else if (
      key.startsWith(path) &&
      !key.slice(path === "/" ? path.length : path.length + 1).includes("/") &&
      value.length
    ) {
      folders.push(key);
    }
  }
  return [folders, modules];
}

function Folder({ children, base, parent }: {
  children: Child<string>;
  base: string;
  parent: string;
}) {
  const folderName = take(children);
  const url = `${base}${folderName}`;
  const href = services.resolveHref(url);
  const label = `${folderName.slice(parent === "/" ? 1 : parent.length + 1)}/`;
  return (
    <a class={tw`flex gap-1 p-2 rounded-lg w-full`} href={href}>
      <Icons.Dir />
      {label}
    </a>
  );
}

function Module({ children, base, parent, isIndex }: {
  children: Child<string>;
  base: string;
  parent: string;
  isIndex?: boolean;
}) {
  const modulePath = take(children);
  const url = `${base}${modulePath}`;
  const href = services.resolveHref(url);
  const label = modulePath.slice(parent === "/" ? 1 : parent.length + 1);
  return (
    <a
      class={tw`flex gap-1 p-2 rounded-lg w-full ${
        isIndex ? "bg-gray-100 font-bold" : ""
      }`}
      href={href}
    >
      <Icons.File />
      {label}
      {isIndex && (
        <span class={tw`text-[#6C6E78] font-light`}>(default module)</span>
      )}
    </a>
  );
}

export function ModulePathIndexPanel(
  { children, path = "/", base }: {
    children: Child<ModuleIndexWithDoc>;
    base: string;
    path?: string;
  },
) {
  const { index } = take(children);
  const [folders, modules] = findItems(path, index);
  const items = folders.map((folder) => (
    <Folder base={base} parent={path}>
      {folder}
    </Folder>
  ));

  const moduleIndex = getIndex(modules);
  if (moduleIndex) {
    items.push(
      <Module base={base} parent={path} isIndex={true}>{moduleIndex}</Module>,
    );
  }
  modules.sort();
  for (const module of modules) {
    if (module !== moduleIndex) {
      items.push(
        <Module base={base} parent={path}>{module}</Module>,
      );
    }
  }
  if (items.length === 0) {
    return <></>;
  }
  return (
    <div class={tw`w-72 flex-shrink-0`}>
      {
        /*<input
        type="text"
        class={tw
          `rounded-lg border border-[#DDDDDD] text-sm w-full py-2.5 pl-4`}
        placeholder="Jump to..."
      />
      <div class={tw`mt-4`}>
      </div>*/
      }
      {items}
    </div>
  );
}
