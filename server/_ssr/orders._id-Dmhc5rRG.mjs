import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { i as offerPath, n as formatPrice, t as fmtDate } from "./money-B4hGHpjt.mjs";
import { f as resolveOrderFn } from "./admin.functions-BYyVESXN.mjs";
import { t as StatusBadge } from "./StatusBadge-C-vpbayq.mjs";
import { B as Copy, U as CircleCheck, a as TriangleAlert, j as KeyRound, m as Send } from "../_libs/lucide-react.mjs";
import { n as Stars, t as StarInput } from "./Stars-BSAod481.mjs";
import { t as ConfirmButton } from "./ConfirmButton-DuzhZhsy.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as retryPaymentFn, i as disputeFn, l as reviewFn, o as fetchOrder, r as confirmReceivedFn, s as replyReviewFn, u as sendMessageFn } from "./orders.functions-B_jXhxHU.mjs";
import { t as Route } from "./orders._id-Bnjq7yRB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-Dmhc5rRG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useAct(id) {
	const qc = useQueryClient();
	const { t } = useI18n();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const run = async (fn, success) => {
		setBusy(true);
		try {
			await fn();
			if (success) toast.success(success);
			await qc.invalidateQueries({ queryKey: ["order", id] });
		} catch (e) {
			toast.error(t(e.message));
		}
		setBusy(false);
	};
	return {
		busy,
		run
	};
}
function Delivery({ d }) {
	const { t } = useI18n();
	const items = d.messages.filter((m) => m.kind === "delivery");
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-xl border border-primary/50 bg-accent p-4",
		"data-testid": "order-delivery",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 font-semibold",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }),
				" ",
				t("Your item")
			]
		}), items.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "flex-1 whitespace-pre-wrap break-all rounded-lg bg-background p-3 font-mono text-sm",
				"data-testid": "order-delivery-content",
				children: m.body
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				variant: "ghost",
				"aria-label": "Copy",
				"data-testid": "copy-delivery",
				onClick: () => {
					navigator.clipboard.writeText(m.body);
					toast.success(t("Copied"));
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
			})]
		}, m.id))]
	});
}
function Chat({ d }) {
	const { t, locale } = useI18n();
	const { busy, run } = useAct(d.order.id);
	const [body, setBody] = (0, import_react.useState)("");
	const who = {
		buyer: t("Buyer"),
		seller: t("Seller"),
		admin: t("Support"),
		system: "JUJ"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3 rounded-xl border bg-card p-4",
		"data-testid": "order-chat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: t("Order chat")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-96 space-y-2 overflow-y-auto",
				children: d.messages.filter((m) => m.kind !== "delivery").map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.kind === "system" ? "mx-auto bg-muted text-center text-xs text-muted-foreground" : m.mine ? "ms-auto bg-primary/20" : "bg-secondary"}`,
					children: [
						m.kind !== "system" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold text-muted-foreground",
							children: who[m.from]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap break-words",
							children: m.kind === "system" ? t(m.body) : m.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[10px] text-muted-foreground",
							children: fmtDate(m.created_at, locale, true)
						})
					]
				}, m.id))
			}),
			d.can.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: body,
					onChange: (e) => setBody(e.target.value),
					maxLength: 4e3,
					rows: 3,
					placeholder: d.can.deliver ? t("Write a message, or paste the item to deliver it…") : t("Write a message…"),
					"data-testid": "chat-input"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						disabled: busy || !body.trim(),
						"data-testid": "chat-send",
						onClick: () => run(() => sendMessageFn({ data: {
							orderId: d.order.id,
							body
						} }).then(() => setBody(""))),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }),
							" ",
							t("Send")
						]
					}), d.can.deliver && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						disabled: busy || !body.trim(),
						"data-testid": "chat-deliver",
						onClick: () => run(() => sendMessageFn({ data: {
							orderId: d.order.id,
							body,
							deliver: true
						} }).then(() => setBody("")), t("Marked as delivered")),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }),
							" ",
							t("Deliver item")
						]
					})]
				})]
			})
		]
	});
}
function ReviewBox({ d }) {
	const { t } = useI18n();
	const { busy, run } = useAct(d.order.id);
	const [rating, setRating] = (0, import_react.useState)(5);
	const [comment, setComment] = (0, import_react.useState)("");
	const [reply, setReply] = (0, import_react.useState)("");
	if (d.review) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-2 rounded-xl border bg-card p-4",
		"data-testid": "order-review",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: t("Review")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: d.review.rating }),
			d.review.comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: d.review.comment
			}),
			d.review.seller_reply && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-lg bg-muted p-2 text-sm",
				children: [
					t("Seller reply"),
					": ",
					d.review.seller_reply
				]
			}),
			d.can.reply && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: reply,
					onChange: (e) => setReply(e.target.value),
					maxLength: 1e3,
					placeholder: t("Reply to this review…"),
					"data-testid": "review-reply-input"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					disabled: busy || !reply.trim(),
					"data-testid": "review-reply-submit",
					onClick: () => run(() => replyReviewFn({ data: {
						orderId: d.order.id,
						reply
					} }), t("Reply posted")),
					children: t("Post reply")
				})]
			})
		]
	});
	if (!d.can.review) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3 rounded-xl border bg-card p-4",
		"data-testid": "review-form",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: t("Rate the seller")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarInput, {
				value: rating,
				onChange: setRating
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: comment,
				onChange: (e) => setComment(e.target.value),
				maxLength: 1e3,
				placeholder: t("How was your purchase? (optional)"),
				"data-testid": "review-comment"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: busy,
				"data-testid": "review-submit",
				onClick: () => run(() => reviewFn({ data: {
					orderId: d.order.id,
					rating,
					comment
				} }), t("Thanks for your review!")),
				children: t("Post review")
			})
		]
	});
}
function Actions({ d }) {
	const { t } = useI18n();
	const { busy, run } = useAct(d.order.id);
	const [reason, setReason] = (0, import_react.useState)("");
	const [disputing, setDisputing] = (0, import_react.useState)(false);
	const id = d.order.id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			d.can.pay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				disabled: busy,
				"data-testid": "order-pay-button",
				onClick: () => run(async () => {
					const r = await retryPaymentFn({ data: { orderId: id } });
					if (!r.ok) throw new Error(r.error);
					window.location.href = r.url;
				}),
				children: t("Pay now")
			}),
			d.can.confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
				variant: "default",
				className: "h-10 w-full",
				disabled: busy,
				testId: "order-confirm-button",
				question: t("Did you receive the item? The payment will be released to the seller."),
				onConfirm: () => run(() => confirmReceivedFn({ data: { orderId: id } }), t("Thanks! The order is completed.")),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
					" ",
					t("I received the item")
				]
			}),
			d.can.dispute && !disputing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				className: "w-full",
				"data-testid": "order-dispute-button",
				onClick: () => setDisputing(true),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
					" ",
					t("Report a problem")
				]
			}),
			disputing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-xl border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: reason,
					onChange: (e) => setReason(e.target.value),
					maxLength: 2e3,
					placeholder: t("What went wrong?"),
					"data-testid": "dispute-reason"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "destructive",
					size: "sm",
					disabled: busy || reason.trim().length < 5,
					"data-testid": "dispute-submit",
					onClick: () => run(() => disputeFn({ data: {
						orderId: id,
						reason
					} }), t("Dispute opened")),
					children: t("Open dispute")
				})]
			}),
			d.can.resolve && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-xl border border-dashed p-3",
				"data-testid": "admin-order-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase text-muted-foreground",
					children: t("Admin")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						disabled: busy,
						"data-testid": "admin-release",
						onClick: () => run(() => resolveOrderFn({ data: {
							id,
							action: "release"
						} }), t("Payment released to the seller")),
						children: t("Release to seller")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "destructive",
						disabled: busy,
						"data-testid": "admin-refund",
						onClick: () => run(() => resolveOrderFn({ data: {
							id,
							action: "refund"
						} }), t("Order refunded")),
						children: t("Refund buyer")
					})]
				})]
			}),
			d.can.cancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				disabled: busy,
				"data-testid": "admin-cancel",
				onClick: () => run(() => resolveOrderFn({ data: {
					id,
					action: "cancel"
				} }), t("Order cancelled")),
				children: t("Cancel order")
			})
		]
	});
}
function Page() {
	const { id } = Route.useLoaderData();
	const { cancelled } = Route.useSearch();
	const { t, locale } = useI18n();
	const q = useQuery({
		queryKey: ["order", id],
		queryFn: () => fetchOrder({ data: { id } }),
		refetchInterval: 15e3
	});
	if (q.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-24 text-center text-muted-foreground",
		children: t("Loading…")
	});
	if (!q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-24 text-center",
		"data-testid": "order-not-found",
		children: t("Order not found.")
	});
	const d = q.data;
	const o = d.order;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_340px]",
		"data-testid": "order-detail",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold sm:text-3xl",
						"data-testid": "order-title",
						children: t("Order #{id}", { id: o.id })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status })]
				}),
				cancelled && o.status === "pending_payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm",
					"data-testid": "payment-cancelled",
					children: t("The payment was not completed. You can try again.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 rounded-xl border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted",
						children: o.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: o.image_url,
							alt: "",
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/catalog/product/$offer",
								params: { offer: offerPath(o.slug, o.offer_id) },
								className: "font-semibold hover:underline",
								children: o.offer_title
							}),
							o.option_label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: o.option_label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [
									formatPrice(o.unit_price_minor, o.currency),
									" × ",
									o.quantity,
									" = ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										"data-testid": "order-total",
										children: formatPrice(o.total_minor, o.currency)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									t("Seller"),
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/seller/$id",
										params: { id: o.seller_id },
										className: "underline",
										children: o.seller_name
									}),
									" · ",
									t("Buyer"),
									": ",
									o.buyer
								]
							})
						]
					})]
				}),
				Object.keys(o.inputs).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid gap-2 rounded-xl border bg-card p-4 text-sm sm:grid-cols-2",
					"data-testid": "order-inputs",
					children: Object.entries(o.inputs).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-medium",
						children: v
					})] }, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delivery, { d }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chat, { d })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 rounded-xl border bg-card p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: t("Created")
								}),
								" ",
								fmtDate(o.created_at, locale, true)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: t("Paid")
								}),
								" ",
								fmtDate(o.paid_at, locale, true)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: t("Delivered")
								}),
								" ",
								fmtDate(o.delivered_at, locale, true)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: t("Completed")
								}),
								" ",
								fmtDate(o.completed_at, locale, true)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: t("Payment method")
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: o.payment_provider
								})
							]
						}),
						d.role !== "buyer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: t("Platform fee")
								}),
								" ",
								formatPrice(o.commission_minor, o.currency)
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, { d }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewBox, { d })
			]
		})]
	});
}
//#endregion
export { Page as component };
