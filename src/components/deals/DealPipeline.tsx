
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types/deal";
import { formatCurrency } from "@/lib/utils";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DealPipelineProps {
  deals?: Deal[];
  onDealClick?: (dealId: string) => void;
  onDealMoved?: (dealId: string, newStage: string) => void;
}

const DealPipeline: React.FC<DealPipelineProps> = ({ 
  deals = [], 
  onDealClick = () => {},
  onDealMoved = () => {}
}) => {
  const { toast } = useToast();
  const stages = [
    { id: "lead", name: "Lead" },
    { id: "qualification", name: "Qualified" },
    { id: "proposal", name: "Proposal" },
    { id: "negotiation", name: "Negotiation" },
    { id: "closed-won", name: "Closed Won" },
    { id: "closed-lost", name: "Closed Lost" }
  ];

  // Sample data for demo purposes
  const [localDeals, setLocalDeals] = useState<Deal[]>(deals.length > 0 ? deals : [
    {
      id: "deal1",
      name: "Software Implementation",
      stage: "lead",
      value: 25000,
      probability: 20,
      closeDate: new Date("2023-12-30"),
      organization: "org1",
      description: "Initial implementation of CRM software",
      createdAt: new Date("2023-10-15"),
      updatedAt: new Date("2023-10-20")
    },
    {
      id: "deal2",
      name: "Hardware Upgrade",
      stage: "qualification",
      value: 15000,
      probability: 40,
      closeDate: new Date("2023-12-15"),
      organization: "org2",
      description: "Server infrastructure upgrade",
      createdAt: new Date("2023-10-10"),
      updatedAt: new Date("2023-10-18")
    },
    {
      id: "deal3",
      name: "Annual Support Contract",
      stage: "proposal",
      value: 50000,
      probability: 60,
      closeDate: new Date("2023-11-30"),
      organization: "org3",
      description: "Yearly support and maintenance",
      createdAt: new Date("2023-09-25"),
      updatedAt: new Date("2023-10-22")
    },
    {
      id: "deal4",
      name: "Cloud Migration Project",
      stage: "negotiation",
      value: 75000,
      probability: 80,
      closeDate: new Date("2023-11-15"),
      organization: "org1",
      description: "Migrating on-prem systems to cloud",
      createdAt: new Date("2023-09-15"),
      updatedAt: new Date("2023-10-24")
    },
    {
      id: "deal5",
      name: "Mobile App Development",
      stage: "closed-won",
      value: 35000,
      probability: 100,
      closeDate: new Date("2023-10-10"),
      organization: "org4",
      description: "Custom mobile application development",
      createdAt: new Date("2023-08-20"),
      updatedAt: new Date("2023-10-10")
    },
    {
      id: "deal6",
      name: "Network Security Audit",
      stage: "closed-lost",
      value: 12000,
      probability: 0,
      closeDate: new Date("2023-10-05"),
      organization: "org5",
      description: "Comprehensive security assessment",
      createdAt: new Date("2023-08-15"),
      updatedAt: new Date("2023-10-05")
    }
  ]);

  // Use effect to update local deals when props deals change
  React.useEffect(() => {
    if (deals.length > 0) {
      setLocalDeals(deals);
    }
  }, [deals]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped back in its original location
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Find the deal that was dragged
    const draggedDeal = localDeals.find(deal => deal.id === draggableId);

    if (!draggedDeal) return;

    // Create a new array without the dragged deal
    const updatedDeals = localDeals.filter(deal => deal.id !== draggableId);

    // Create a copy of the dragged deal with the updated stage
    const updatedDeal = { 
      ...draggedDeal,
      stage: destination.droppableId,
      updatedAt: new Date(),
      // Update probability based on new stage
      probability: getProbabilityForStage(destination.droppableId)
    };

    // Add the updated deal to the deals array
    updatedDeals.push(updatedDeal);

    // Update the state
    setLocalDeals(updatedDeals);
    
    // Call the callback to inform parent component
    onDealMoved(draggableId, destination.droppableId);

    // Show toast notification
    toast({
      title: "Deal moved",
      description: `${draggedDeal.name} moved to ${stages.find(s => s.id === destination.droppableId)?.name}`,
    });
  };

  // Helper function to determine probability based on stage
  const getProbabilityForStage = (stage: string): number => {
    switch (stage) {
      case 'lead': return 10;
      case 'qualification': return 30;
      case 'proposal': return 50;
      case 'negotiation': return 70;
      case 'closed-won': return 100;
      case 'closed-lost': return 0;
      default: return 10;
    }
  };

  // Calculate days since update
  const getDaysSinceUpdate = (date: Date | string): number => {
    const updateDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - updateDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Deal Pipeline</CardTitle>
          <CardDescription>Drag and drop deals between stages</CardDescription>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {stages.map((stage) => (
                <div key={stage.id} className="flex-shrink-0 w-72">
                  <div className="bg-muted rounded-t-md px-3 py-2 border-b">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{stage.name}</h3>
                      <Badge variant="outline">
                        {localDeals.filter(deal => deal.stage === stage.id).length}
                      </Badge>
                    </div>
                  </div>
                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`bg-muted/30 rounded-b-md p-2 min-h-[400px] ${
                          snapshot.isDraggingOver ? "bg-primary/5" : ""
                        }`}
                      >
                        {localDeals
                          .filter(deal => deal.stage === stage.id)
                          .map((deal, index) => (
                            <Draggable
                              key={deal.id}
                              draggableId={deal.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`bg-card border rounded-md p-3 mb-2 cursor-pointer hover:border-primary transition-colors ${
                                    snapshot.isDragging ? "shadow-lg border-primary" : ""
                                  }`}
                                  onClick={() => onDealClick(deal.id)}
                                >
                                  <div className="flex justify-between mb-2">
                                    <div className="font-medium">{deal.name}</div>
                                    <div className="text-sm font-medium">{formatCurrency(deal.value)}</div>
                                  </div>
                                  <div className="text-sm text-muted-foreground mb-2">
                                    {deal.organization ? `Organization ID: ${deal.organization}` : 'No organization'}
                                  </div>
                                  <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                      <span className="text-muted-foreground">
                                        {getDaysSinceUpdate(deal.updatedAt)} days
                                      </span>
                                    </div>
                                    <Badge variant={deal.probability >= 50 ? "default" : "outline"}>
                                      {deal.probability}%
                                    </Badge>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealPipeline;
