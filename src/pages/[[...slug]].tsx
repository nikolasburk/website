import type { InferGetStaticPropsType } from "next";
import { useLiveReload } from "next-contentlayer/hooks";
import type { FC } from "react";

import { PageLayout } from "../layouts/PageLayout";
import { DocLayout } from "../layouts/DocLayout";

import { defineStaticProps, toParams } from "../utils/next";
import { allDocuments } from ".contentlayer/data";
import { isType } from ".contentlayer/types";

export const getStaticPaths = async () => {
  const paths = allDocuments
    .filter(isType(["Doc", "Page"]))
    .map((_) => _.url_path)
    .map(toParams);

  return { paths, fallback: false };
};

export const getStaticProps = defineStaticProps(async (context) => {
  const params = context.params as any;
  const pagePath = params.slug?.join("/") ?? "";

  const doc = allDocuments
    .filter(isType(["Doc", "Page"]))
    .find((_) => _.url_path === pagePath)!;

  return { props: { doc } };
});

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ doc }) => {
  useLiveReload();

  switch (doc.type) {
    case "Page":
      return <PageLayout page={doc} />;
    case "Doc":
      return <DocLayout doc={doc} />;
  }
};

export default Page;
