"use client";
import React, { FC, forwardRef, useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";

export type VirtualListProps = {
  count: number;
  itemHeight: number;
  viewportHeight: number;
  children: (index: number) => React.ReactNode;
};

const getRandomList = () =>
  new Array(10_000).fill(0).map((_, index) => Math.random());

export default function ClientPage() {
  const listRef = useRef<any>(null);
  const [items, setItems] = useState<number[]>(() => getRandomList());
  useEffect(() => {
    Cookie.set("timer", "client", {
      expires: 3,
    });
  }, []);
  return (
    <div>
      <h1>Virtual list</h1>
      {/* <VirtualList ref={listRef}  count={items.length} itemHeight={32} viewportHeight={640}>
                {(i) => {
                    return <div style={{height:32,border:"1px solid #333"}}>{i}</div>
                }}
            </VirtualList> */}
    </div>
  );
}
