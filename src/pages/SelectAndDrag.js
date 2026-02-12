import React from "react";
import { useState, useRef, useEffect } from "react";

//import components
import SelectionBox from "../components/SelectionBox/SelectionBox";
import SelectableCard from "../components/SelectableCard/SelectableCard";

export default function SelectAndDrag() {
  //state management and refs
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [highlightedCards, setHighlightedCards] = useState(new Set());
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const containerRef = useRef(null);
  const cardRefs = useRef({});

  //write out cards
  const cardData = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    title: `Site name ${index + 1}`,
    description: `Site description ${index + 1}`,
  }));

  const checkIntersection = (selectionRect, cardRect) => {
    return !(
      selectionRect.left > cardRect.right ||
      selectionRect.right < cardRect.left ||
      selectionRect.top > cardRect.bottom ||
      selectionRect.bottom < cardRect.top
    );
  };

  const updateHighlightedCards = () => {
    if (!selectionStart || !selectionEnd) return;

    const selectionRect = {
      left: Math.min(selectionStart.x, selectionEnd.x),
      right: Math.max(selectionStart.x, selectionEnd.x),
      top: Math.min(selectionStart.y, selectionEnd.y),
      bottom: Math.max(selectionStart.y, selectionEnd.y),
    };

    const newHighlightedCards = new Set();

    Object.entries(cardRefs.current).forEach(([id, ref]) => {
      if (ref && ref.current) {
        const cardRect = ref.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const relativeCardRect = {
          left: cardRect.left - containerRect.left,
          right: cardRect.right - containerRect.left,
          top: cardRect.top - containerRect.top,
          bottom: cardRect.bottom - containerRect.top,
        };

        if (checkIntersection(selectionRect, relativeCardRect)) {
          newHighlightedCards.add(Number(id));
        }
      }
    });

    setHighlightedCards(newHighlightedCards);
  };
  const handleMouseDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setIsMouseDown(true);
    setSelectionStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setSelectionEnd({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (isMouseDown) {
      const rect = containerRef.current.getBoundingClientRect();
      setSelectionEnd({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  useEffect(() => {
    if (isMouseDown) {
      updateHighlightedCards();
    }
  }, [selectionEnd]);

  return (
    <div className="container">
    <div
      className="App"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <SelectionBox startPoint={selectionStart} endPoint={selectionEnd} />
      <div className="row">
        <div className="col">
          <h1>Multi-select cards</h1>
          <p>Click and drag to highlight and select cards on the page.</p>
        </div>
      </div>
      <div className="cardsContainer">
        {cardData.map((card) => {
          if (!cardRefs.current[card.id]) {
            cardRefs.current[card.id] = React.createRef();
          }
          return (
            <SelectableCard
              key={card.id}
              title={card.title}
              description={card.description}
              isHighlighted={highlightedCards.has(card.id)}
              cardRef={cardRefs.current[card.id]}
            />
          );
        })}
      </div>
    </div>
    </div>
  );
}
