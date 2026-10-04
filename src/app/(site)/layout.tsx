import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getAnnouncementQuery } from "@/sanity/lib/queries";
import { CinematicLoader } from "@/components/CinematicLoader";
import React from "react";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcement = await sanityFetch<any>({ query: getAnnouncementQuery, tags: ['announcementBar'] });

  return (
    <>
      <CinematicLoader />
      <AnnouncementBar announcement={announcement} />
      <Navigation />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
